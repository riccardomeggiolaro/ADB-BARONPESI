import { ApiProperty } from '@nestjs/swagger';
import { ApplicationTenantDB as PrismaApplicationTenantDB } from '@prisma/client';
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

export class ApplicationTenantDB {
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
  
  constructor(partial: Partial<PrismaApplicationTenantDB>) {
    Object.assign(this, partial);
  }
}