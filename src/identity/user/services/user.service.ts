import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { isDefined } from '@shared/utils';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';
import { ERROR_USER_NOT_FOUND } from 'src/identity/auth/constants/auth.constants';
import { selectOptions, User } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const newUser: User = await this.prisma.user.create({ data, select: selectOptions });

    return newUser;
  }

  async list(): Promise<User[]> {
    return await this.prisma.user.findMany({ select: selectOptions });
  }

  async findById(id: string): Promise<User | undefined> {
    const user: User | null = await this.prisma.user.findUnique({ where: { id }, select: selectOptions });

    return isDefined(user) ? user : undefined;
  }

  async findByIdOrThrow(id: string): Promise<User> {
    const user: User | null = await this.prisma.user.findUnique({ where: { id }, select: selectOptions });

    if (!isDefined(user)) throw new NotFoundException(ERROR_USER_NOT_FOUND);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user: User | null = await this.prisma.user.findFirst({ where: { email }, select: selectOptions });

    return isDefined(user) ? user : undefined;
  }

  async updatePassword(id: string, password: string): Promise<User | undefined> {
    const user: User | null = await this.prisma.user.update({ where: { id }, data: { password }, select: selectOptions })

    return isDefined(user) ? user : undefined;
  }

  async deleteById(id: string): Promise<User> {
    try {
      return await this.prisma.user.delete({ where: { id, role: Role.USER }, select: selectOptions });
    } catch (err) {
      console.log(err)
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    }
  }
}