rm -rf node_modules

rm pnpm-lock.yaml

pnpm install

npx prisma generate --schema=src/config/database/schema.prisma

pnpm run start:dev