import { Module } from '@nestjs/common';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';
import { ApplicationTenantDBController } from './controllers/application_tenat_db.controller';
import { ApplicationTenantDBService } from './services/application_tenant_db.service';

@Module({
  imports: [],
  controllers: [ApplicationTenantDBController],
  providers: [
    ApplicationTenantDBService,
    PrismaMySqlService
  ],
})
export class ApplicationTenantDBModule {}