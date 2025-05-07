import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isDefined } from 'class-validator';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';
import { Prisma } from '@prisma/client';
import { ApplicationTenantDB, ApplicationTenantDBDTO, selectOPtions } from '../dtos/application_tenant_db.dto';
import { ERROR_APPLICATION_TENANT_DB_NOT_FOUND, ERROR_APPLLICATION_TENANT_DB_EXISTS } from '../constants/application_tenant_db.constants';

@Injectable()
export class ApplicationTenantDBService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async register(data: ApplicationTenantDBDTO): Promise<ApplicationTenantDB> {
    const application_tenat_db = {
        applicationId: data.applicationId,
        companyId: data.companyId,
        database_connection: data.database_connection
    }

    const existingApplicationTenantDB: ApplicationTenantDB | undefined = await this.findJustExists(application_tenat_db);

    if (isDefined(existingApplicationTenantDB)) {
      throw new BadRequestException(ERROR_APPLLICATION_TENANT_DB_EXISTS);
    }

    try {
      await this.prisma.$connect();
      const newApplicationTenantDB: ApplicationTenantDB = await this.prisma.applicationTenantDB.create({
        data: {
          application: {
            connect: {id: data.applicationId}
          },
          company: {
            connect: {id: data.companyId}
          },
          database_connection: data.database_connection
        },
        select: selectOPtions
      });

      return newApplicationTenantDB;
    } catch(err) {
      if (err.code === "P2025") {
        let errorMessage: string = "";
      
        if (err.message.includes("'Application'")) {
          errorMessage = `La applicazione con ID '${data.applicationId}' non esiste`;
        } else if (err.message.includes("'Company'")) {
          errorMessage = `La azienda con ID '${data.companyId}' non esiste`;
        }

        throw new NotFoundException(errorMessage);
      }
      throw new Error(err.message);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findById(id: string): Promise<ApplicationTenantDB | undefined> {
    try {
      await this.prisma.$connect();
      const applicationTenantDB: ApplicationTenantDB | null = await this.prisma.applicationTenantDB.findUnique({
        where: { id },
        select: selectOPtions
      });
  
      if (!isDefined(applicationTenantDB)) {
        throw new NotFoundException(ERROR_APPLICATION_TENANT_DB_NOT_FOUND);
      }
  
      return applicationTenantDB;
    } catch (err) {
      throw err;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findJustExists(data: Prisma.ApplicationTenantDBWhereInput): Promise<ApplicationTenantDB | undefined> {
    try {
      await this.prisma.$connect();
      const applicationTenantDB: ApplicationTenantDB | null = await this.prisma.applicationTenantDB.findFirst({ where: data, select: selectOPtions });

      return isDefined(applicationTenantDB) ? applicationTenantDB : undefined;
    } catch (err) {
      throw err;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async list(): Promise<ApplicationTenantDB[]> {
    try {
      await this.prisma.$connect();
      return await this.prisma.applicationTenantDB.findMany({ select: selectOPtions });
    } catch (err) {
      throw err;
    } finally {
      await this.prisma.$disconnect();
    }
  }
}