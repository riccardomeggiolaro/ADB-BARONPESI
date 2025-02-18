import { Injectable } from '@nestjs/common';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { isDefined } from '@shared/utils';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';

import { User } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const newUser: PrismaUser = await this.prisma.user.create({ data });

    return new User(newUser);
  }

  async findById(id: string): Promise<User | undefined> {
    const user: PrismaUser | null = await this.prisma.user.findUnique({
      where: { id },
    });

    return isDefined(user) ? new User(user) : undefined;
  }
}
