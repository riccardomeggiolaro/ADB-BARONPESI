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
    const existingCompany: Company | undefined = await this.findByDescription(data.description);

    if (isDefined(existingCompany)) {
      throw new BadRequestException(ERROR_COMPANY_EXISTS);
    }

    const newCompany: PrismaCompany = await this.prisma.company.create({data});

    return new Company(newCompany);
  }

  async findById(id: string): Promise<Company | undefined> {
    const company: PrismaCompany | null = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!isDefined(company)) {
      throw new NotFoundException(ERROR_COMPANY_NOT_FOUND);
    }

    return new Company(company);
  }

  async findByDescription(description: string): Promise<Company | undefined> {
    const company: PrismaCompany | null = await this.prisma.company.findFirst({
      where: { description },
    });

    return isDefined(company) ? new Company(company) : undefined;
  }

  async list(): Promise<Company[]> {
    return await this.prisma.company.findMany() as Company[];
  }
}