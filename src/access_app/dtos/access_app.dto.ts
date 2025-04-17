import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { User } from "src/identity/user/dtos/user.dto";
import { ApplicationTenantDB } from "src/application_tenant_db/dtos/application_tenant_db.dto";
import { Prisma, Role } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

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
        description: 'Role of user.',
        example: 'USER',
    })
    @IsEnum(Role, { message: 'Role must be either USER or ADMIN' })
    role: Role;

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
    role: true,
    isActive: true,
    applicationFunctionalData: true,
    user: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        companyId: false,
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
    role?: Role;
    isActive: boolean;
    applicationFunctionalData?: Prisma.JsonValue | null;
}

export interface CanAccessApp {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    picture: string | null,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    password: string,
    company: {
        id: string,
        description: string,
        cell: string | null,
        cfpiva: string | null
    },
    database_connection: string,
    application: {
        id: string,
        description: string,
        code: string
    },
    applicationFunctionalData: JsonValue | null;
}