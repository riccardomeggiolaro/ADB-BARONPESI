import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isDefined } from 'class-validator';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';
import { Prisma, ApplicationTenantDB as PrismaApplicationTenantDB } from '@prisma/client';
import { ApplicationTenantDB, ApplicationTenantDBDTO } from '../dtos/application_tenant_db.dto';
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
      const newApplicationTenantDB: PrismaApplicationTenantDB = await this.prisma.applicationTenantDB.create({
        data: {
          applications: {
            connect: {id: data.applicationId}
          },
          companies: {
            connect: {id: data.companyId}
          },
          database_connection: data.database_connection
        }
      });

      return new ApplicationTenantDB(newApplicationTenantDB);
    } catch(err) {
      if (err.code === "P2025") {
        let errorMessage: string = "";
      
        console.log(err.message);

        if (err.message.includes("'Application'")) {
          errorMessage = `La applicazione con ID '${data.applicationId}' non esiste`;
        } else if (err.message.includes("'Company'")) {
          errorMessage = `La azienda con ID '${data.companyId}' non esiste`;
        }
        throw new NotFoundException(errorMessage);
      }
      throw new Error(err.message);
    }
  }

  async findById(id: string): Promise<ApplicationTenantDB | undefined> {
    const applicationTenantDB: PrismaApplicationTenantDB | null = await this.prisma.applicationTenantDB.findUnique({
      where: { id },
    });

    if (!isDefined(applicationTenantDB)) {
      throw new NotFoundException(ERROR_APPLICATION_TENANT_DB_NOT_FOUND);
    }

    return new ApplicationTenantDB(applicationTenantDB);
  }

  async findJustExists(data: Prisma.ApplicationTenantDBWhereInput): Promise<ApplicationTenantDB | undefined> {
    const applicationTenantDB: PrismaApplicationTenantDB | null = await this.prisma.applicationTenantDB.findFirst({
      where: data,
    });

    return isDefined(applicationTenantDB) ? new ApplicationTenantDB(applicationTenantDB) : undefined;
  }

  async list(): Promise<ApplicationTenantDB[]> {
    return await this.prisma.applicationTenantDB.findMany();
  }
}