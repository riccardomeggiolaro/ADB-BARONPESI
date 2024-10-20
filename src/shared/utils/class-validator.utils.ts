import {
  type ValidationError,
  type ValidatorOptions,
  validate as classValidate,
  validateSync as classValidateSync,
} from 'class-validator';

/**
 * Formats validation errors into a string array.
 *
 * @param {ValidationError[]} errors - An array of validation errors returned by class-validator.
 * @returns {string[]} An array of formatted error messages.
 */
export function formatValidationErrors(errors: ValidationError[]): string[] {
  return errors.reduce((acc: string[], error: ValidationError) => {
    if (error.constraints) {
      acc.push(...Object.values(error.constraints));
    }

    return acc;
  }, []);
}

/**
 * Synchronously validates an object using class-validator and returns formatted error messages.
 *
 * @param {object} object - The object to validate.
 * @param {ValidatorOptions} [validatorOptions] - Optional validator configuration options.
 * @returns {string[]} An array of formatted validation error messages.
 */
export function validate(
  object: object,
  validatorOptions?: ValidatorOptions,
): string[] {
  const errors: ValidationError[] = classValidateSync(object, validatorOptions);

  return formatValidationErrors(errors);
}

/**
 * Asynchronously validates an object using class-validator and returns formatted error messages.
 *
 * @param {object} object - The object to validate.
 * @param {ValidatorOptions} [validatorOptions] - Optional validator configuration options.
 * @returns {Promise<string[]>} A promise that resolves to an array of formatted validation error messages.
 */
export async function validateAsync(
  object: object,
  validatorOptions?: ValidatorOptions,
): Promise<string[]> {
  const errors: ValidationError[] = await classValidate(
    object,
    validatorOptions,
  );

  return formatValidationErrors(errors);
}
