import { ApiProperty } from '@nestjs/swagger';
import { User as PrismaUser } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export type UserWithoutFUllName = Omit<User, 'fullName'>;

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class User {
  @ApiProperty({
    description: 'Unique identifier of the user.',
    example: '1234',
  })
  id: string;

  @ApiProperty({
    description: 'The user\'s first name.',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'The user\'s last name.',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description:
      'The user\'s full name, automatically generated from first and last names.',
    example: 'John Doe',
    readOnly: true, // This property is derived and should not be set directly by the client.
  })
  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @ApiProperty({
    description: 'Indicates whether the user is active.',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'The date and time when the user account was created.',
    example: '2024-01-01T12:00:00Z',
  })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the user account was last updated.',
    example: '2024-01-01T12:00:00Z',
  })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updatedAt: Date;

  @Exclude()
  picture?: string | null | undefined;

  @ApiProperty({
    description: 'Role of user',
    example: 'USER'
  })
  @IsEnum(Role)
  role: Role.USER | Role.ADMIN;

  @ApiProperty({
    description: ' Id of company',
    example: "0992ac19-d670-46a7-a98c-b3bb2d8f3562"
  })
  @IsString()
  @IsOptional()
  companyId: string | null;

  @ApiProperty({
    description: 'Email of user',
    example: 'riccardo.meggiolaro@baron.it'
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Password of user',
    example: 'admin'
  })
  @IsString()
  password: string;

  constructor(partial: Partial<PrismaUser>) {
    Object.assign(this, partial);
  }
}