import { Module } from '@nestjs/common';
import { AccessAppService } from './services/access_app.service';
import { AccessAppController } from './controllers/access_app.controller';

@Module({
  imports: [],
  controllers: [AccessAppController],
  providers: [
    AccessAppService,
  ],
})
export class AccessAppModule {}