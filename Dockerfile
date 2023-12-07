# Build Stage
FROM node:20-slim AS build

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

# Final Stage
FROM node:20-slim

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/.output ./.output
COPY --from=build /app/package*.json ./

# Install only PostgreSQL client (not the entire apt-get update suite)
RUN apt-get update && apt-get install -y postgresql-client
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 3000

