import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from '@shared/guards/auth.guard';
import { NotFoundInterceptor } from '@shared/interceptors';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { EmailModule } from './email/email.module';
import { IdentityModule } from './identity/identity.module';
import { CompanyModule } from './company/company.module';
import { ApplicationModule } from './application/application.module';
import { ApplicationTenantDBModule } from './application_tenant_db/application_tenant_db.module';

@Module({
  imports: [ConfigModule, IdentityModule, EmailModule, CompanyModule, ApplicationModule, ApplicationTenantDBModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: NotFoundInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
