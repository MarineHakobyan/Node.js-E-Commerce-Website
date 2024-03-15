## Current Status

<span style="color: #007acc">

#### 🚀 Currently working on adding products service and separating it from auth-microservice.

</span>

# Quick Start Guide

## Main Node Environment: Node 16.13.1

## 1. Go to project and Copy Environment Variables

```bash
cd auth-ms
cp .env.example .env
```

## 2. Start Docker Containers
```bash
docker-compose up -d postgres
```

## 3. Create Database
```bash
docker exec -it $(docker-compose ps -q postgres) psql -d builderpad
```

## 4. Install Dependencies and Build
```bash
npm install
npm run build
```

## 5. Run Migrations
```bash
npm run migration:run
```

## 6. Start Application
```bash
npm run start
```

