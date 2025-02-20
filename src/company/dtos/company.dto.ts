import { ApiProperty } from '@nestjs/swagger';
import { Company as PrismaCompany } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class CompanyDTO {
  @ApiProperty({
    description: 'Unique identifier of the company.',
    example: 'Baron Pesi Srl',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The cell of company.',
    example: '123456789',
  })
  @IsOptional()
  @IsString()
  cell: string | null;

  @ApiProperty({
    description: 'The CFPIVA of the company.',
    example: 'RSSMRA80E15H501',
  })
  @IsOptional()
  @IsString()
  cfpiva: string | null;  
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
  cell: string | null;

  @ApiProperty({
    description: 'The CFPIVA of the company.',
    example: 'RSSMRA80E15H501',
  })
  @IsOptional()
  cfpiva: string | null;
  
  constructor(partial: Partial<PrismaCompany>) {
    Object.assign(this, partial);
  }
}

export class CompanyId {
  @IsString()
  id: string;
}