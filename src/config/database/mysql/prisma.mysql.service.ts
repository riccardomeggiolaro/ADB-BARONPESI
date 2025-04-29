import type { OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { Global, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaMySqlService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // static instanceCount = 0;

  constructor() {
    super({
      errorFormat: 'minimal'
    });
    // PrismaMySqlService.instanceCount++;
    // console.log('🔥 PrismaMySqlService instances:', PrismaMySqlService.instanceCount);
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    // console.log('PrismaMySqlService initialized');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
