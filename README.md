Now running on :
localhost/ (localhost:80/)

Build Frontend + Backend :: NO RUN
docker compose build

Build Frontend + Backend from scratch :: No cache
docker compose build --no-cache

Build + Run 
docker compose up --build

Build Frontend
docker compose build frontend

Build Backend 
docker compose build backend

Run everything after building
docker compose up

Build + Run
docker compose up --build


Connect to DB within the container
docker exec -it <backend-container-hash> bash
apt-get update && apt-get install -y postgresql-client
psql -h your-rds-endpoint.amazonaws.com -U youruser -d yourdb
\q to exit