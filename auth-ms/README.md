Quick Start Guide
This guide provides a quick overview of the steps necessary to get the application up and running.

Main Node Environment: Node 16.13.1
1. Copy Environment Variables
   cp .env.example .env
2. Start Docker Containers
   docker-compose up postgres -d
3. Create Database
   docker exec -it $(docker-compose ps -q postgres) psql -d builderpad
4. Install Dependencies
   npm i
5. Run Migrations
   npm run migration:run
6. Start Application
   npm run start