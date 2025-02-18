import type { Provider } from '@nestjs/common';

import { Module } from '@nestjs/common';

import { PrismaMySqlService } from './mysql/prisma.mysql.service';

const providers: Provider[] = [PrismaMySqlService];

@Module({
  providers,
  exports: [...providers],
})
export class DatabaseModule {}
