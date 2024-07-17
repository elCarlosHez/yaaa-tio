variable "stage" {
  description = "environment"
  type        = string
  sensitive   = false
}

variable "main_region" {
  description = "deployment region"
  type        = string
  sensitive   = false
  default     = "us-east-1"
}
