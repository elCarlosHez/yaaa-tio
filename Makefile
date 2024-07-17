run-be:
	./backend/pocketbase serve

local:
	docker build . -t yaaa-tio:latest -f Dockerfile.dev
	docker run yaaa-tio:latest

tf-dev-check:
	terraform -chdir=./tf validate
	terraform -chdir=./tf plan -var-file="stage-dev.tfvars"
	terraform -chdir=./tf show

tf-dev-deploy:
	terraform -chdir=./tf apply -var-file="stage-dev.tfvars"

tf-dev-destroy:
	terraform -chdir=./tf destroy -var-file="stage-dev.tfvars"
