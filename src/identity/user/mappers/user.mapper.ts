/* eslint-disable @typescript-eslint/class-methods-use-this */
import { Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';

import { User } from '../dtos/user.dto';

@Injectable()
export class UserMapper {
  /**
   * Maps a Prisma User object or an array of Prisma User objects to a User entity or an array of User entities.
   *
   * This method handles both single-object mapping and array mapping. If an array is provided, each element
   * will be individually mapped to the corresponding entity.
   *
   * @param document - A Prisma User object or an array of Prisma User objects to be mapped.
   * @returns A single User entity, or an array of User entities if the input is an array.
   */
  mapToEntity(document: PrismaUser): User;
  mapToEntity(document: PrismaUser[]): User[];
  mapToEntity(document: PrismaUser | PrismaUser[]): User | User[] {
    return Array.isArray(document)
      ? document.map((doc: PrismaUser) => this.mapSingleEntity(doc))
      : this.mapSingleEntity(document);
  }

  /**
   * Maps a single Prisma User object to a User entity.
   *
   * This private method is used internally by `mapToEntity` to handle individual object mapping.
   *
   * @param document - A single Prisma User object to be mapped.
   * @returns A mapped User entity
   */
  private mapSingleEntity(document: PrismaUser): User {
    const { id, firstName, lastName, isActive, createdAt, updatedAt } =
      document;

    return {
      id,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      isActive,
      createdAt,
      updatedAt,
    };
  }
}
