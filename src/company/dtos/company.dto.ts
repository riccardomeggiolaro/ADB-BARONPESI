import { ApiProperty } from '@nestjs/swagger';
import { Company as PrismaCompany } from '@prisma/client';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CompanyDTO {
  @ApiProperty({
    description: 'Unique identifier of the company.',
    example: 'Baron Pesi Srl',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The cell of company.',
    example: 123456789,
  })
  @IsOptional()
  @IsString()
  cell: string | null | undefined;

  @ApiProperty({
    description: 'The CFPIVA of the company.',
    example: 'IJSRGOERNONBOB',
  })
  @IsOptional()
  @IsString()
  cfpiva: string | null | undefined;  
}

export class Company {
  @ApiProperty({
    description: 'Unique identifier of the company.',
    example: 'Baron Pesi Srl',
  })
  description: string;

  @ApiProperty({
    description: 'The cell of company.',
    example: '123456789',
  })
  @IsOptional()
  cell: string | null | undefined;

  @ApiProperty({
    description: 'The CFPIVA of the company.',
    example: 'IJSRGOERNONBOB',
  })
  @IsOptional()
  cfpiva: string | null | undefined;
  
  constructor(partial: Partial<PrismaCompany>) {
    Object.assign(this, partial);
  }
}
