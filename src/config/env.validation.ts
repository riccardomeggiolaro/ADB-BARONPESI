import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  ValidationError,
  validateSync,
} from 'class-validator';

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}
export class EnvironmentVariables {
  @IsEnum(Environment, {
    message: 'NODE_ENV must be one of: development, production, test',
  })
  NODE_ENV: Environment;

  @IsNumber({}, { message: 'PORT must be a valid number' })
  PORT: number;
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
    const errorMessages: string[] = errors
      .map((error: ValidationError) => {
        if (error.constraints) {
          return Object.values(error.constraints).map(
            (message: string) => `${error.property}: ${message}`,
          );
        }

        return [];
      })
      .flat();

    throw new Error(`Validation failed: ${errorMessages.join('; ')}`);
  }

  return validatedConfig;
}
