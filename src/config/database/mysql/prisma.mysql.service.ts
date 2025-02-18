import type { OnModuleInit } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaMySqlService
  extends PrismaClient
  implements OnModuleInit
{
  constructor() {
    super({
      errorFormat: 'minimal',
    });
  }
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
