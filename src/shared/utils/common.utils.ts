import type { TransformFnParams } from 'class-transformer';

/**
 * check if value !== undefined && !== null
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return (value as T) !== undefined && (value as T) !== null;
}

/**
 * check if value !== undefined && !== null && !== ''
 */
export function isStringDefined(
  value: string | null | undefined,
): value is string {
  return isDefined(value) && value !== '';
}

/**
 * Returns a transformation function that converts a value to an integer,
 * using a default value in case of parsing errors or undefined value.
 *
 * @param {number} def - The default value to return in case of an error.
 * @returns {(params: TransformFnParams) => number | undefined} - The transformation function.
 */
export function getIntTransformWithDefault(
  def: number,
): (params: TransformFnParams) => number | undefined {
  return (params: TransformFnParams): number | undefined => {
    if (!isDefined(params.value)) {
      return undefined;
    }

    const value: number = parseInt(params.value as string, 10);

    if (isNaN(value)) {
      return def;
    }

    return value;
  };
}

/**
 * Transforms the input value into an integer, if possible.
 *
 * @param {TransformFnParams} params - The object containing the value to transform.
 * @returns {number | undefined} - The transformed number, or undefined if the value is undefined or can't be converted.
 */
export function numberTransform(params: TransformFnParams): number | undefined {
  if (!isDefined(params.value)) {
    return undefined;
  }

  const value: number = parseInt(params.value as string, 10);

  if (isNaN(value)) {
    return undefined;
  }

  return value;
}

/**
 * Transforms an input value into a boolean.
 * Returns true if the value is 'true', false if it is 'false', or undefined otherwise.
 *
 * @param {TransformFnParams} params - The object containing the value to transform.
 * @returns {boolean | undefined} - The transformed boolean, or undefined if the value does not match.
 */
export function booleanTransform(
  params: TransformFnParams,
): boolean | undefined {
  switch (params.value) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return undefined;
  }
}

/**
 * Transforms the input value into a string and trims whitespace.
 *
 * @param {TransformFnParams} params - The object containing the value to transform.
 * @returns {string | undefined} - The trimmed string, or undefined if the value is undefined.
 */
export function trimStringTransform(
  params: TransformFnParams,
): string | undefined {
  if (!isDefined(params.value)) {
    return undefined;
  }

  return (params.value as string).trim();
}
