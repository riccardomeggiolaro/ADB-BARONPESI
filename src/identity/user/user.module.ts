import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserMapper } from './mappers/user.mapper';
import {
  UserIdentity,
  UserIdentitySchema,
} from './schemas/user-identity.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UserIdentityService } from './services/user-identity.service';
import { UserService } from './services/user.service';

export const providers: Provider[] = [
  UserService,
  UserIdentityService,
  UserMapper,
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserIdentity.name, schema: UserIdentitySchema },
    ]),
  ],
  providers,
  exports: [...providers],
})
export class UserModule {}
