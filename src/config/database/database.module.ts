import type { Provider } from '@nestjs/common';

import { Global, Module } from '@nestjs/common';

import { PrismaMySqlService } from './mysql/prisma.mysql.service';

const providers: Provider[] = [PrismaMySqlService];

@Global()
@Module({
  providers: [
    {provide: PrismaMySqlService, useClass: PrismaMySqlService}
  ],
  exports: [...providers],
})
export class DatabaseModule {}
