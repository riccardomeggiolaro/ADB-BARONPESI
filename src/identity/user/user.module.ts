import { Module, Provider } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

export const providers: Provider[] = [UserService];

@Module({
  imports: [],
  controllers: [UserController],
  providers: [...providers],
  exports: [...providers],
})
export class UserModule {}
