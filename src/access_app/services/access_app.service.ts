import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isDefined } from 'class-validator';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';
import { AccessApp, AccessAppDTO, selectOptions } from '../dtos/access_app.dto';
import { ERROR_ACCESS_APP_EXISTS, ERROR_ACCESS_APP_NOT_FOUND } from '../constants/access_app.constants';

@Injectable()
export class AccessAppService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async register(data: AccessAppDTO): Promise<AccessApp> {
    const accessApp = {
        userId: data.userId,
        applicationTenantDBId: data.applicationTenantDBId
    };

    const existingAccessApp: AccessApp | undefined = await this.findJustExists(accessApp);

    if (isDefined(existingAccessApp)) {
      throw new BadRequestException(ERROR_ACCESS_APP_EXISTS);
    }

    try {
      const newAccessApp: AccessApp = await this.prisma.accessApp.create({
        data: {
            user: {
                connect: {
                    id: data.userId
                }
            },
            application_tenant_db: {
                connect: {
                    id: data.applicationTenantDBId
                }
            },
            role: data.role,
            applicationFunctionalData: JSON.stringify(data.applicationFunctionalData)
        },
        select: selectOptions
      });

      return newAccessApp;
    } catch(err) {
      if (err.code === "P2025") {
        let errorMessage: string = "";
      
        if (err.message.includes("'ApplicationTenantDB'")) {
          errorMessage = `La applicazione tenant db con ID '${data.applicationTenantDBId}' non esiste`;
        } else if (err.message.includes("'User'")) {
          errorMessage = `Lo user con ID '${data.userId}' non esiste`;
        }

        throw new NotFoundException(errorMessage);
      }
      throw new Error(err.message);
    }
  }

  async findJustExists(data: Omit<AccessAppDTO, 'applicationFunctionalData' | 'role'>): Promise<AccessApp | undefined> {
    const accessAppData = {
      userId: data.userId,
      applicationTenantDBId: data.applicationTenantDBId,
    };
    const accessApp: AccessApp | null = await this.prisma.accessApp.findFirst({ where: accessAppData, select: selectOptions });

    return isDefined(accessApp) ? accessApp : undefined;
  }

  async findById(id: string): Promise<AccessApp | undefined> {
    const accessApp: AccessApp | null = await this.prisma.accessApp.findUnique({
      where: { id },
      select: selectOptions
    });

    if (!isDefined(accessApp)) {
      throw new NotFoundException(ERROR_ACCESS_APP_NOT_FOUND);
    }

    return accessApp;
  }

  async findByUserIdAndApplicationCode(userId: string, applicationCode: string): Promise<AccessApp | undefined> {
    const accessApp: AccessApp | null = await this.prisma.accessApp.findFirst({
      where: {
        userId,
        application_tenant_db: {
          application: {
            code: applicationCode
          }
        }
      },
      select: selectOptions
    });
    if (!isDefined(accessApp)) {
      throw new NotFoundException(ERROR_ACCESS_APP_NOT_FOUND);
    }
    if (!accessApp.isActive && !accessApp.user?.isActive) {
      throw new BadRequestException('Access app is not active');
    }
    return accessApp;
  }

  async list(): Promise<AccessApp[]> {
    return await this.prisma.accessApp.findMany({ select: selectOptions });
  }

  async deleteById(id: string): Promise<AccessApp | undefined> {
    const accessApp: AccessApp | null = await this.prisma.accessApp.findUnique({ where: { id }, select: selectOptions });

    if (!isDefined(accessApp)) {
      throw new NotFoundException(ERROR_ACCESS_APP_NOT_FOUND);
    }

    return await this.prisma.accessApp.delete({ where: { id }, select: selectOptions });
  }
}