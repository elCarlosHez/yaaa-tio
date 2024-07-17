local:
	@echo "=== Building FE ==="
	cd frontend && npm run build
	@echo "=== Running BE ==="
	./backend/pocketbase serve

docker:
	docker build . -t yaaa-tio:latest -f Dockerfile.dev --no-cache
	docker run --name yaaatio --rm -p 8080:8080 yaaa-tio:latest

dev-check:
	terraform -chdir=./tf validate
	terraform -chdir=./tf plan -var-file="stage-dev.tfvars"
	terraform -chdir=./tf show

dev-deploy:
	terraform -chdir=./tf apply -var-file="stage-dev.tfvars"

dev-destroy:
	terraform -chdir=./tf destroy -var-file="stage-dev.tfvars"
