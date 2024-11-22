import { Module, Provider } from '@nestjs/common';
import { PrismaPostgreSqlService } from 'src/config/database/postgresql/prisma.postgresql.service';

import { UserIdentityService } from './services/user-identity.service';
import { UserService } from './services/user.service';

export const providers: Provider[] = [UserService, UserIdentityService];

@Module({
  providers: [...providers, PrismaPostgreSqlService],
  exports: [...providers],
})
export class UserModule {}
