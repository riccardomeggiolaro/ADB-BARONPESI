import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument } from '@shared/types';
import { isDefined } from '@shared/utils';
import { Model } from 'mongoose';

import { CreateUserIdentityDto } from '../dtos/user-identity.dto';
import {
  UserIdentity,
  UserIdentityDocument,
} from '../schemas/user-identity.schema';

@Injectable()
export class UserIdentityService {
  constructor(
    @InjectModel(UserIdentity.name)
    private readonly userIdentityModel: Model<UserIdentity>,
  ) {}

  async findByEmail(
    email: string,
  ): Promise<LeanDocument<UserIdentity> | undefined> {
    const identity: LeanDocument<UserIdentity> | null =
      await this.userIdentityModel
        .findOne({
          'credentials.email': email.toLowerCase(),
        })
        .populate('user')
        .lean()
        .exec();

    return isDefined(identity) ? identity : undefined;
  }

  async create(
    createUserIdentityDto: CreateUserIdentityDto,
  ): Promise<UserIdentity> {
    const identity: UserIdentityDocument = await this.userIdentityModel.create(
      createUserIdentityDto,
    );

    return identity.toObject();
  }
}
