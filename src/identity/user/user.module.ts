import { Module, Provider } from '@nestjs/common';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';

import { UserIdentityService } from './services/user-identity.service';
import { UserService } from './services/user.service';

export const providers: Provider[] = [UserService, UserIdentityService];

@Module({
  providers: [...providers, PrismaMySqlService],
  exports: [...providers],
})
export class UserModule {}
