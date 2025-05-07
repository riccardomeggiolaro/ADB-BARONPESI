import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { isDefined } from '@shared/utils';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';
import { ERROR_USER_NOT_FOUND } from 'src/identity/auth/constants/auth.constants';
import { IsActiveDTO, selectOptions, User } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      await this.prisma.$connect();

      const newUser: User = await this.prisma.user.create({ data, select: selectOptions });

      return newUser;
    } catch (err) {
      throw err;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async list(): Promise<User[]> {
    try {
      await this.prisma.$connect();
      return await this.prisma.user.findMany({ select: selectOptions });
    } catch (err) {
      throw err;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findById(id: string): Promise<User | undefined> {
    try {
      await this.prisma.$connect();

      const user: User | null = await this.prisma.user.findUnique({ where: { id }, select: selectOptions });

      return isDefined(user) ? user : undefined;
    } catch (err){
      throw err;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findByIdOrThrow(id: string): Promise<User> {
    try {
      await this.prisma.$connect();

      const user: User | null = await this.prisma.user.findUnique({ where: { id }, select: selectOptions });

      if (!isDefined(user)) throw new NotFoundException(ERROR_USER_NOT_FOUND);
  
      return user;
    } catch (err) {
      throw err;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      await this.prisma.$connect();

      const user: User | null = await this.prisma.user.findFirst({ where: { email }, select: selectOptions });

      return isDefined(user) ? user : undefined;
    } catch (err) {
      throw err;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async updatePassword(id: string, password: string): Promise<User | undefined> {
    try {
      await this.prisma.$connect();

      const user: User | null = await this.prisma.user.update({ where: { id }, data: { password }, select: selectOptions })

      return isDefined(user) ? user : undefined;
    } catch (err) {
      throw err;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async isACtive(isACtive: IsActiveDTO): Promise<User> {
    try {
      await this.prisma.$connect();
      return await this.prisma.user.update({ where: { id: isACtive.id, role: Role.USER }, data: { isActive: isACtive.status }, select: selectOptions })
    } catch (err) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async deleteById(id: string): Promise<User> {
    try {
      await this.prisma.$connect();
      return await this.prisma.user.delete({ where: { id, role: Role.USER }, select: selectOptions });
    } catch (err) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}