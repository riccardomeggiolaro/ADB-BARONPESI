import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';

export class LoginBodyDto {
  @ApiProperty({
    description: 'The user\'s email address.',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The user\'s password.',
    example: 'P@ssw0rd123',
  })
  @IsString()
  password: string;
}

export class RegisterBodyDto {
  @ApiProperty({
    description: 'The user\'s first name.',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @ApiProperty({
    description: 'The user\'s last name.',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @ApiProperty({
    description: 'URL to the user\'s profile picture.',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  picture?: string;

  @ApiProperty({
    description: 'The user\'s email address.',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Password should be at least 8 characters, contain 1 letter, 1 number, and 1 special character.',
    example: 'P@ssw0rd123',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Password must be at least 8 characters, with 1 letter, 1 number, and 1 special character',
  })
  password: string;

  @ApiProperty({
    description: ' Id of company',
    example: "0992ac19-d670-46a7-a98c-b3bb2d8f3562"
  })
  @IsString()
  @IsOptional()
  companyId: string | null;
}

export class RequestResetPasswordBodyDto {
  @ApiProperty({
    description: 'Email address of the user requesting password reset',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;
}

export class ResetPasswordBodyDto {
  @ApiProperty({
    description: 'Email address of the user resetting the password',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Token sent to the user for password reset',
    example: 'abc123xyz',
  })
  @IsString()
  token: string;

  @ApiProperty({
    description:
      'New password (min. 8 characters, 1 letter, 1 number, 1 special character)',
    example: 'Password@123',
  })
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Password must be at least 8 characters, with 1 letter, 1 number, and 1 special character',
  })
  newPassword: string;
}
