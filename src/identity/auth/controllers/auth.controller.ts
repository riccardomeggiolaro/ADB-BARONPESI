/* eslint-disable @typescript-eslint/class-methods-use-this */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthUser, Public } from '@shared/decorators';
import { LocalAuthGuard } from '@shared/guards';

import { User } from '../../user/dtos/user.dto';

import { RegisterDto } from '../dtos/auth.dto';
import { AuthResponseDto } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authSrv: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@AuthUser() user: User): Promise<AuthResponseDto> {
    return this.authSrv.login(user);
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authSrv.register(registerDto);
  }
}
