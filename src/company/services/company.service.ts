import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isDefined } from 'class-validator';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';
import { Company as PrismaCompany } from '@prisma/client';
import { Company, CompanyDTO } from '../dtos/company.dto';
import { ERROR_COMPANY_EXISTS, ERROR_COMPANY_NOT_FOUND } from '../constants/company.constants';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async register(data: CompanyDTO): Promise<Company> {
    try {
      await this.prisma.$connect();
      const existingCompany: Company | undefined = await this.findByDescription(data.description);

      if (isDefined(existingCompany)) {
        throw new BadRequestException(ERROR_COMPANY_EXISTS);
      }
  
      const newCompany: PrismaCompany = await this.prisma.company.create({data});
  
      return new Company(newCompany);
    } catch (err) {
      throw err;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findById(id: string): Promise<Company | undefined> {
    try {
      await this.prisma.$connect();
      const company: PrismaCompany | null = await this.prisma.company.findUnique({
        where: { id },
      });
  
      if (!isDefined(company)) {
        throw new NotFoundException(ERROR_COMPANY_NOT_FOUND);
      }
  
      return new Company(company);
    } catch (err) {
      throw err;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findByDescription(description: string): Promise<Company | undefined> {
    try {
      await this.prisma.$connect();
      const company: PrismaCompany | null = await this.prisma.company.findFirst({
        where: { description },
      });
  
      return isDefined(company) ? new Company(company) : undefined;
    } catch (err) {
      throw err;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async list(): Promise<Company[]> {
    try {
      await this.prisma.$connect();
      return await this.prisma.company.findMany() as Company[];
    } catch (err) {
      throw err;
    } finally {
      await this.prisma.$disconnect();
    }
  }
}