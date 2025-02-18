import type { ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { User } from 'src/identity/user/dtos/user.dto';

import { createParamDecorator } from '@nestjs/common';

export const AuthUser: (...dataOrPipes: unknown[]) => ParameterDecorator =
  createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
    const request: Request & { user: User } = ctx.switchToHttp().getRequest();

    return request.user;
  });
