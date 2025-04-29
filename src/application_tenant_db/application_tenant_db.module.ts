import { Module } from '@nestjs/common';
import { ApplicationTenantDBController } from './controllers/application_tenat_db.controller';
import { ApplicationTenantDBService } from './services/application_tenant_db.service';

@Module({
  imports: [],
  controllers: [ApplicationTenantDBController],
  providers: [
    ApplicationTenantDBService,
  ],
})
export class ApplicationTenantDBModule {}