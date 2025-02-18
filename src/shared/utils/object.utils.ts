import { isDefined } from './common.utils';

/**
 * Returns an object containing the fields that have different values between two objects.
 *
 * @param {Partial<T>} updatedData - The object with the updated values to compare.
 * @param {T} originalData - The original object with the baseline values.
 * @returns {Partial<T>} An object containing the fields that have changed.
 */
export function findDifferences<T extends object>(
  updatedData: Partial<T>,
  originalData: T,
): Partial<T> {
  const differences: Partial<T> = {};

  for (const key in updatedData) {
    if (isDefined(updatedData[key]) && updatedData[key] !== originalData[key]) {
      differences[key] = updatedData[key];
    }
  }

  return differences;
}
