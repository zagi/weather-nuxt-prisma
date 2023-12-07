#!/bin/bash
set -e

until pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER; do
    echo "Postgres is unavailable - sleeping"
    sleep 1
done

echo "Postgres is up - executing command"

npx prisma db push 

exec npm run start