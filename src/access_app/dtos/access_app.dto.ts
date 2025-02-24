import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";
import { User } from "src/identity/user/dtos/user.dto";
import { ApplicationTenantDB } from "src/application_tenant_db/dtos/application_tenant_db.dto";
import { Prisma } from "@prisma/client";
import { application } from "express";

export class ApplicationFunctionalData {
    @IsInt()
    @IsOptional()
    access_level: number;

    @IsInt()
    @IsOptional()
    installationId: number;
}

export class AccessAppDTO {
    @ApiProperty({
        description: 'Id of user.',
        example: '0992ac19-d670-46a7-a98c-b3bb2d8f3562',
    })
    @IsString()
    userId: string;

    @ApiProperty({
        description: 'Id of application tenant db.',
        example: '0992ac19-d670-46a7-a98c-b3bb2d8f3562',
    })
    @IsString()
    applicationTenantDBId: string;

    @ApiProperty({
        description: 'Application functional data',
        type: ApplicationFunctionalData
    })
    @IsOptional()
    applicationFunctionalData: ApplicationFunctionalData;
}

export const selectOptions = {
    id: true,
    userId: false,
    applicationTenantDBId: false,
    applicationFunctionalData: true,
    user: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        companyId: true,
        picture: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        password: true,
        company: true // Includi esplicitamente la relazione company
      }
    },
    application_tenant_db: {
        select: {
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
    }
}

export interface AccessApp {
    user?: User;
    application_tenant_db: ApplicationTenantDB;
    applicationFunctionalData?: Prisma.JsonValue | null;
}