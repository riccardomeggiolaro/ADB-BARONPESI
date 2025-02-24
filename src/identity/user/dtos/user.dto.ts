import { Company as PrismaCompany } from '@prisma/client';
import { IsBoolean, IsString } from 'class-validator';
import { AccessApp } from 'src/access_app/dtos/access_app.dto';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const selectOptions = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  isActive: true,
  company: true,
  createdAt: true,
  updatedAt: true,
  picture: true,
  companyId: false,
  password: true,
  access_app: {
    select: {
      id: true,
      applicationTenantDBId: false,
      application_tenant_db: {
        select: {
          id: true,
          applicationId: false,
          companyId: false,
          application: {
            select: {
              id: true,
              description: true,
              code: true
            }
          },
          company: {
            select: {
              id: true,
              description: true,
              cell: true,
              cfpiva: true
            }
          },
          database_connection: true
        }
      },
      applicationFunctionalData: true
    }
  }
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  company?: PrismaCompany | null;
  createdAt: Date;
  updatedAt: Date;
  picture: string | null;
  password: string;
  access_app?: AccessApp[];
}

export class IsActiveDTO {
  @IsString()
  id: string;

  @IsBoolean()
  status: boolean;
}