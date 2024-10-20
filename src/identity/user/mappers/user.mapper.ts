/* eslint-disable @typescript-eslint/class-methods-use-this */
import { Injectable } from '@nestjs/common';
import { LeanDocument } from '@shared/types';

import { MongoUser, User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserMapper {
  /**
   * Maps a single document or an array of documents to entity/entities
   * @param document User lean document(s) from MongoDB
   * @returns Mapped user entity/entities
   */
  mapToEntity(document: LeanDocument<MongoUser> | UserDocument): User;
  mapToEntity(
    document: Array<LeanDocument<MongoUser>> | UserDocument[],
  ): User[];
  mapToEntity(
    document: LeanDocument<MongoUser> | Array<LeanDocument<MongoUser>>,
  ): User | User[] {
    return Array.isArray(document)
      ? document.map((doc: LeanDocument<MongoUser>) =>
        this.mapSingleEntity(doc),
      )
      : this.mapSingleEntity(document);
  }

  private mapSingleEntity(document: LeanDocument<MongoUser>): User {
    const { _id, firstName, lastName } = document;

    return {
      id: _id.toString(),
      fullName: `${firstName} ${lastName}`,
      firstName,
      lastName,
    };
  }
}
