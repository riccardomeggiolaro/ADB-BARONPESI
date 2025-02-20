import { Module } from '@nestjs/common';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';
import { ApplicationController } from './controllers/application.controller';
import { ApplicationService } from './services/application.service';

@Module({
  imports: [],
  controllers: [ApplicationController],
  providers: [
    ApplicationService,
    PrismaMySqlService
  ],
})
export class ApplicationModule {}