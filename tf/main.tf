terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "5.58.0" }
  }
}

provider "aws" {
  region = var.main_region

  default_tags {
    tags = {
      created-by = "terraform"
      project    = "yaaa-tio"
      stage      = var.stage
    }
  }
}


# --- VPC ---
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "main_public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"
}

# resource "aws_subnet" "main_private" {
#   vpc_id            = aws_vpc.some_custom_vpc.id
#   cidr_block        = "10.0.2.0/24"
#   availability_zone = "us-east-1a"

#   tags = {
#     Name = "Some Private Subnet"
#   }
# }

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  route {
    ipv6_cidr_block = "::/0"
    gateway_id      = aws_internet_gateway.main.id
  }
}

resource "aws_route_table_association" "public_1_rt_a" {
  subnet_id      = aws_subnet.main_public.id
  route_table_id = aws_route_table.public_rt.id
}


# --- Security groups ---
resource "aws_security_group" "allow_http" {
  name        = "allow_http"
  description = "Security group to allow http/https and ping (icmp) traffic"
  vpc_id      = aws_vpc.main.id
  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
  }
  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
  }
  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
  }
  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
  }
}

# resource "aws_security_group" "allow_ssh" {
#   name        = "allow_ssh"
#   description = "Security group to ssh traffic"
#   vpc_id      = aws_vpc.main.id
#   ingress = {
#     cidr_blocks = ["127.0.0.1/32"]
#     from_port   = 22
#     to_port     = 22
#     protocol    = "tcp"
#   }
# }


# --- I AM EC2 ---
resource "aws_iam_role" "main_ec2" {
  name = "main_ec2"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = "sts:AssumeRole"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_instance_profile" "main_ec2" {
  name = "main_ec2"
  role = aws_iam_role.main_ec2.name
}

resource "aws_iam_role_policy" "main_ec2_policy" {
  name = "ec2_policy"
  role = aws_iam_role.main_ec2.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Resource = "*"
      Action = [
        "ecr:GetAuthorizationToken",
        "ecr:BatchGetImage",
        "ecr:GetDownloadUrlForLayer"
      ]
    }]
  })
}


# --- ECR ---
resource "aws_ecr_repository" "main" {
  name                 = "main"
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }
}

## Build & push image
locals {
  repo_url = aws_ecr_repository.main.repository_url
}

resource "null_resource" "image" {
  triggers = {
    hash = md5(join("-", [for x in fileset("", "../*end/**") : filemd5(x)]))
  }

  provisioner "local-exec" {
    command = <<EOF
      aws ecr get-login-password | docker login --username AWS --password-stdin ${local.repo_url}
      docker build -t ${local.repo_url}:latest ../
      docker push ${local.repo_url}:latest
    EOF
  }
}

data "aws_ecr_image" "latest" {
  repository_name = aws_ecr_repository.main.name
  image_tag       = "latest"
  depends_on      = [null_resource.image]
}


# --- Instances ---
data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-ebs"]
  }
}

resource "aws_instance" "app_yaaatio" {
  ami                     = data.aws_ami.amazon_linux_2.id
  instance_type           = "t3.micro"
  iam_instance_profile    = aws_iam_instance_profile.main_ec2.name
  monitoring              = true
  disable_api_termination = false
  ebs_optimized           = true

  root_block_device {
    volume_size = 8
  }

  subnet_id = aws_subnet.main_public.id
  vpc_security_group_ids = [
    aws_security_group.allow_http.id
  ]
  associate_public_ip_address = true

  # TODO: how to maintain /pb/pb_data for each deployment
  # https://stackoverflow.com/questions/57158310/how-to-restart-ec2-instance-using-terraform-without-destroying-them
  user_data = <<-EOF
#! /bin/bash
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user
sudo timedatectl set-timezone America/New_York
sudo aws ecr get-login-password --region ${var.main_region} | docker login --username AWS --password-stdin ${local.repo_url}
sudo docker pull ${local.repo_url}:latest
sudo docker run ${local.repo_url}:latest
EOF

}


output "public_ip" {
  value = aws_instance.app_yaaatio.public_ip
}
