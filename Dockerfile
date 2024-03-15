FROM node:16.13.1-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
FROM node:16.13.1-alpine
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/src /app/src
COPY --from=builder /app/config /app/config
WORKDIR /app
EXPOSE 3000
USER node
CMD [ "npm", "start" ]
