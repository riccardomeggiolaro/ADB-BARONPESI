/* eslint-disable @typescript-eslint/class-methods-use-this */
import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { validate } from '@shared/utils';
import { plainToInstance } from 'class-transformer';
import { LoginBodyDto } from 'src/identity/auth/dtos/body.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const loginDto: LoginBodyDto = plainToInstance(LoginBodyDto, request.body);

    const errors: string[] = validate(loginDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return super.canActivate(context) as Promise<boolean> | boolean;
  }
}
