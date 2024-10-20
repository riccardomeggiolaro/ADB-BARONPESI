import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument } from '@shared/types';
import { isDefined } from '@shared/utils';
import { Model } from 'mongoose';

import { UserMapper } from '../mappers/user.mapper';
import { MongoUser, User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly userMapper: UserMapper,
  ) {}

  async create(user: MongoUser): Promise<User> {
    const newUser: UserDocument = await this.userModel.create(user);

    return this.userMapper.mapToEntity(newUser);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel
      .findById(id)
      .lean()
      .transform((doc: LeanDocument<User>) =>
        isDefined(doc) ? this.userMapper.mapToEntity(doc) : undefined,
      )
      .exec();
  }
}
