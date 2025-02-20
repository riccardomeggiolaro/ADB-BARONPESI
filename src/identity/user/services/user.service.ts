import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User as PrismaUser, Role } from '@prisma/client';
import { isDefined } from '@shared/utils';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';

import { User } from '../dtos/user.dto';
import { ERROR_USER_NOT_FOUND } from 'src/identity/auth/constants/auth.constants';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const newUser: PrismaUser = await this.prisma.user.create({ data });

    return new User(newUser);
  }

  async list(): Promise<User[]> {
    return await this.prisma.user.findMany() as User[];
  }

  async findById(id: string): Promise<User | undefined> {
    const user: PrismaUser | null = await this.prisma.user.findUnique({
      where: { id },
    });

    return isDefined(user) ? new User(user) : undefined;
  }

  async findByIdOrThrow(id: string): Promise<User> {
    const user: PrismaUser | null = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!isDefined(user)) throw new NotFoundException(ERROR_USER_NOT_FOUND);

    return new User(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user: PrismaUser | null = await this.prisma.user.findFirst({ where: { email } });

    return isDefined(user) ? new User(user) : undefined;
  }

  async updatePassword(id: string, password: string): Promise<User | undefined> {
    const user: PrismaUser | null = await this.prisma.user.update({ where: { id }, data: { password } })

    return isDefined(user) ? new User(user) : undefined;
  }

  async deleteById(id: string): Promise<User> {
    try {
      const user: PrismaUser | null = await this.prisma.user.delete({ where: { id, role: Role.USER } });
      return new User(user);
    } catch (err) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    }
  }
}