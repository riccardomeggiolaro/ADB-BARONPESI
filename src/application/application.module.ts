import { Module } from '@nestjs/common';
import { ApplicationController } from './controllers/application.controller';
import { ApplicationService } from './services/application.service';

@Module({
  imports: [],
  controllers: [ApplicationController],
  providers: [
    ApplicationService,
  ],
})
export class ApplicationModule {}