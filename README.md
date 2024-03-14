# Quick Start Guide

This guide provides a quick overview of the steps necessary to get the application up and running.

## 1. CD to project and Copy Environment Variables

Copy the environment variables from the provided example file:

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

