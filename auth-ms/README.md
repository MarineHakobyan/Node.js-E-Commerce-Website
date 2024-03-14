# Quick Start Guide

This guide provides a quick overview of the steps necessary to get the application up and running.

## Main Node Environment: Node 16.13.1

## 1. Copy Environment Variables

```bash
cp .env.example .env
```

## 2. Start Docker Containers

```bash
docker-compose up postgres -d
```

## 3. Create Database

```bash
docker exec -it $(docker-compose ps -q postgres) psql -d builderpad
```

## 4. Install Dependencies

```bash
npm i
```

## 5. Run Migrations

```bash
npm run migration:run
```

## 6. Start Application

```bash
npm run start
```