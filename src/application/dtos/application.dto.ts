import { ApiProperty } from '@nestjs/swagger';
import { Application as PrismaApplication } from '@prisma/client';
import { IsString } from 'class-validator';

export class ApplicationDTO {
  @ApiProperty({
    description: 'App to manage all weighing datas.',
    example: 'Baron Pesi Srl',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The code of the application.',
    example: 'APP001',
  })
  @IsString()
  code: string;  
}

export class Application {
  @ApiProperty({
    description: 'Unique identifier of the application.',
    example: 'App to manage all weighing datas',
  })
  description: string;

  @ApiProperty({
    description: 'The code of the application.',
    example: 'APP001',
  })
  @IsString()
  code: string;
  
  constructor(partial: Partial<PrismaApplication>) {
    Object.assign(this, partial);
  }
}