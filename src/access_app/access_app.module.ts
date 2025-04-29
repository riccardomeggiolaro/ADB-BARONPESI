import { Module } from '@nestjs/common';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';
import { AccessAppService } from './services/access_app.service';
import { AccessAppController } from './controllers/access_app.controller';

@Module({
  imports: [],
  controllers: [AccessAppController],
  providers: [
    AccessAppService,
    PrismaMySqlService
  ],
})
export class AccessAppModule {}