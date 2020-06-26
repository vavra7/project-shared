dev:
	docker-compose -f docker-compose.dev.yaml up --force-recreate

dev-server:
	docker-compose -f docker-compose.dev.yaml up --force-recreate server