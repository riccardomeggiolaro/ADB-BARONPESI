import { plainToClass } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  IsUrl,
  ValidationError,
  validateSync,
} from 'class-validator';
import * as kleur from 'kleur';

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

enum Language {
  IT = 'it',
  EN = 'en',
}
export class EnvironmentVariables {
  @IsEnum(Environment, {
    message: 'NODE_ENV must be one of: development, production, test',
  })
  NODE_ENV: Environment;

  @IsNumber({}, { message: 'PORT must be a valid number' })
  PORT: number;

  @IsString()
  MONGODB_URI: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRATION_TIME: string;

  @IsString()
  EMAIL_HOST: string;

  @IsString()
  EMAIL_USER: string;

  @IsString()
  EMAIL_PASS: string;

  @IsEmail()
  EMAIL_FROM: string;

  @IsString()
  @IsEnum(Language, {
    message: 'I18N_FALLBACK must be one of the following values: en, it',
  })
  I18N_FALLBACK: string;

  @IsUrl()
  APP_BASEURL: string;
}

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig: EnvironmentVariables = plainToClass(
    EnvironmentVariables,
    config,
    {
      enableImplicitConversion: true,
    },
  );

  const errors: ValidationError[] = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorMessages: string[] = errors.map((error: ValidationError) => {
      if (error.constraints) {
        const formattedConstraints: string = Object.values(error.constraints)
          .map((message: string) => `   - ${message}`)
          .join('\n');

        return `${kleur.bold().red(error.property)}:\n${formattedConstraints}`;
      }

      return '';
    });

    throw new Error(
      kleur.bold().red('Validation failed:\n') +
        errorMessages.join('\n\n') +
        '\n',
    );
  }

  return validatedConfig;
}
