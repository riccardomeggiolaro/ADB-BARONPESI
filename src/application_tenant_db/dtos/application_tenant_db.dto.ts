import { ApiProperty } from '@nestjs/swagger';
import { Application as PrismaApplication, Company as PrismaCompany } from '@prisma/client';
import { IsString } from 'class-validator';

export class ApplicationTenantDBDTO {
  @ApiProperty({
    description: 'Id of application.',
    example: '0992ac19-d670-46a7-a98c-b3bb2d8f3562',
  })
  @IsString()
  applicationId: string;

  @ApiProperty({
    description: 'Id of company.',
    example: '0992ac19-d670-46a7-a98c-b3bb2d8f3562',
  })
  @IsString()
  companyId: string;  

  @ApiProperty({
    description: 'The string connection of database',
    example: 'mysql://admin:secret@localhost:3306/my_database'
  })
  @IsString()
  database_connection: string;
}

export const selectOPtions = {
  id: true,
  applicationId: false,
  companyId: false,
  database_connection: true,
  application: true,
  company: true
}

export interface ApplicationTenantDB {
  application: PrismaApplication;
  company: PrismaCompany;
  database_connection: string;
}