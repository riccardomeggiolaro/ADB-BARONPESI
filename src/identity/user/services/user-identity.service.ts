import { Injectable } from '@nestjs/common';
import { AuthProvider, Prisma, UserIdentity } from '@prisma/client';
import { isDefined } from '@shared/utils';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';

export type UserIdentityWithUser = Prisma.UserIdentityGetPayload<{
  include: {
    user: true;
  };
}>;

@Injectable()
export class UserIdentityService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async findByEmail(email: string): Promise<UserIdentityWithUser | undefined> {
    const identity: UserIdentityWithUser | null =
      await this.prisma.userIdentity.findFirst({
        where: { email },
        include: {
          user: true,
        },
      });

    return isDefined(identity) ? identity : undefined;
  }

  async create(
    createUserIdentityDto: Prisma.UserIdentityCreateInput,
  ): Promise<UserIdentity> {
    const identity: UserIdentity = await this.prisma.userIdentity.create({
      data: { ...createUserIdentityDto },
    });

    return identity;
  }

  async changePassword(email: string, password: string): Promise<void> {
    await this.prisma.userIdentity.update({
      where: {
        email_provider: {
          email,
          provider: AuthProvider.LOCAL,
        },
      },
      data: {
        password,
      },
    });
  }
}
