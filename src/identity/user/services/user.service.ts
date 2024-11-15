import { Injectable } from '@nestjs/common';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { isDefined } from '@shared/utils';
import { PrismaPostgreSqlService } from 'src/config/database/postgresql/prisma.postgresql.service';

import { User } from '../dtos/user.dto';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaPostgreSqlService,
    private readonly userMapper: UserMapper,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const newUser: PrismaUser = await this.prisma.user.create({ data });

    return this.userMapper.mapToEntity(newUser);
  }

  async findById(id: string): Promise<User | undefined> {
    const user: PrismaUser | null = await this.prisma.user.findUnique({
      where: { id },
    });

    return isDefined(user) ? this.userMapper.mapToEntity(user) : undefined;
  }
}
