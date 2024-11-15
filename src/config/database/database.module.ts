import type { Provider } from '@nestjs/common';

import { Module } from '@nestjs/common';

import { PrismaPostgreSqlService } from './postgresql/prisma.postgresql.service';

const providers: Provider[] = [PrismaPostgreSqlService];

@Module({
  providers,
  exports: [...providers],
})
export class DatabaseModule {}
