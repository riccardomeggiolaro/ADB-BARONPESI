import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import configuration from './env.configuration';
import { validate } from './env.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
      envFilePath: `.env.${process.env.NODE_ENV ?? 'development'}`,
    }),
    DatabaseModule,
  ],
  exports: [DatabaseModule],
})
export class ConfigModule {}
