import { Module } from '@nestjs/common';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';

import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    PrismaMySqlService,
  ],
})
export class CompanyModule {}