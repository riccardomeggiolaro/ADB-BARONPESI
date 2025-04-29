import { join } from 'path';
import { Global, Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, HeaderResolver, I18nModule } from 'nestjs-i18n';
import { DatabaseModule } from './database/database.module';
import configuration from './env.configuration';
import { validate } from './env.validation';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
      envFilePath: `.env.${process.env.NODE_ENV ?? 'development'}`,
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get<string>('i18n.fallback', 'en'),
        loaderOptions: {
          path: join(__dirname, '../i18n/'),
          watch: true,
        },
        resolvers: [
          new HeaderResolver(['x-lang']),
          new AcceptLanguageResolver(),
        ],
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
  ],
  exports: [DatabaseModule],
})
export class ConfigModule {}