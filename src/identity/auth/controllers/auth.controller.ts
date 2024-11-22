import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthUser, Public } from '@shared/decorators';
import { LocalAuthGuard } from '@shared/guards';

import { User } from '../../user/dtos/user.dto';

import { ERROR_EMAIL_EXISTS } from '../constants/auth.constants';
import { LoginBodyDto, RegisterBodyDto } from '../dtos/body.dto';
import { AuthResponseDto } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Public()
@Controller()
export class AuthController {
  constructor(private readonly authSrv: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Login user and return access token.',
    description: 'This endpoint allows a user to login.',
  })
  @ApiBody({
    description: 'The user credentials',
    type: LoginBodyDto,
  })
  @ApiOkResponse({
    description: 'The user was successfully logged in.',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid credentials.',
  })
  async login(@AuthUser() user: User): Promise<AuthResponseDto> {
    return this.authSrv.login(user);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user.',
    description: 'This endpoint allows a new user to register.',
  })
  @ApiBody({
    description: 'The registration details for the new user.',
    type: RegisterBodyDto,
  })
  @ApiCreatedResponse({
    description: 'The user was successfully registered.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: ERROR_EMAIL_EXISTS,
  })
  async register(@Body() registerBodyDto: RegisterBodyDto): Promise<User> {
    return this.authSrv.register(registerBodyDto);
  }
}
