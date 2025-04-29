pnpm install

npx prisma generate --schema=src/config/database/schema.prisma

pnpm run start:prod