import { randomBytes } from 'crypto';

import { Injectable, NotFoundException } from '@nestjs/common';
import { PasswordReset, Prisma, PrismaClient } from '@prisma/client';
import { isDefined } from 'class-validator';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';

import { INVALID_EXPIRED_TOKEN } from '../constants/password-reset.constants';
@Injectable()
export class PasswordResetService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async createResetToken(userId: string): Promise<string> {
    await this.prisma.passwordReset.updateMany({
      where: {
        userId,
        used: false,
      },
      data: {
        used: true,
      },
    });

    const token: string = randomBytes(32).toString('hex');

    const data: Prisma.PasswordResetCreateInput = {
      expiresAt: new Date(Date.now() + 900000),
      user: {
        connect: {
          id: userId
        }
      },
      token: token,
    }

    await this.prisma.passwordReset.create({ data });

    return token;
  }

  async validateAndConsumeToken(id: string, token: string): Promise<void> {
    await this.prisma.$transaction(async (prisma: PrismaClient) => {
      const resetRequest: PasswordReset | null =
        await prisma.passwordReset.findFirst({
          where: {
            user: {
              id: id
            },
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