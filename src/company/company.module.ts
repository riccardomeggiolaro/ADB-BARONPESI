import { Module } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [
    CompanyService,
  ],
})
export class CompanyModule {}