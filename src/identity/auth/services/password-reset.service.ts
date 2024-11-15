import { randomBytes } from 'crypto';

import { Injectable, NotFoundException } from '@nestjs/common';
import { PasswordReset, PrismaClient } from '@prisma/client';
import { isDefined } from 'class-validator';
import { PrismaPostgreSqlService } from 'src/config/database/postgresql/prisma.postgresql.service';

import { INVALID_EXPIRED_TOKEN } from '../constants/password-reset.constants';
@Injectable()
export class PasswordResetService {
  constructor(private readonly prisma: PrismaPostgreSqlService) {}

  async createResetToken(email: string): Promise<string> {
    await this.prisma.passwordReset.updateMany({
      where: {
        email,
        used: false,
      },
      data: {
        used: true,
      },
    });

    const token: string = randomBytes(32).toString('hex');

    await this.prisma.passwordReset.create({
      data: {
        expiresAt: new Date(Date.now() + 900000),
        email,
        token,
      },
    });

    return token;
  }

  async validateAndConsumeToken(email: string, token: string): Promise<void> {
    await this.prisma.$transaction(async (prisma: PrismaClient) => {
      const resetRequest: PasswordReset | null =
        await prisma.passwordReset.findFirst({
          where: {
            email,
            token,
            used: false,
            expiresAt: { gt: new Date() },
          },
        });

      if (!isDefined(resetRequest)) {
        throw new NotFoundException(INVALID_EXPIRED_TOKEN);
      }

      await prisma.passwordReset.update({
        where: {
          id: resetRequest.id,
        },
        data: {
          used: true,
        },
      });
    });
  }
}
