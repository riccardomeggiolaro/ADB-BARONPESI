import type { ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { createParamDecorator } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';

export const AuthUser: (...dataOrPipes: unknown[]) => ParameterDecorator =
  createParamDecorator((data: unknown, ctx: ExecutionContext): PrismaUser => {
    const request: Request & { user: PrismaUser } = ctx.switchToHttp().getRequest();

    return request.user;
  });
