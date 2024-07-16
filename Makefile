run-be:
	./backend/pocketbase serve

local:
	docker-compose build --no-cache
	docker-compose up -d
