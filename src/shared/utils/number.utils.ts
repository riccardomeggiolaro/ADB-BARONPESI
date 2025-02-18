/**
 * Rounds a number to two decimal places.
 * @param {number} num - The number to be rounded.
 * @returns {number} - The number rounded to two decimal places.
 *
 * Example:
 * const rounded = roundToTwo(3.14159); // Output: 3.14
 */
export const roundToTwo = (num: number): number => Math.round(num * 100) / 100;

/**
 * Calculates the percentage of a part relative to a total.
 * @param {number} part - The part of the whole.
 * @param {number} total - The total amount.
 * @returns {number} - The percentage, expressed as a number (0 to 100).
 *
 * Example:
 * const percent = calculatePercentage(25, 200); // Output: 12.5
 */
export const calculatePercentage = (part: number, total: number): number => {
  if (total === 0) {
    throw new Error('Total must be greater than zero to calculate percentage.');
  }

  return (part / total) * 100;
};

/**
 * Rounds a number to the nearest integer.
 * @param {number} num - The number to round.
 * @returns {number} - The nearest integer to the given number.
 *
 * Example:
 * const rounded = roundToInt(4.7); // Output: 5
 */
export const roundToInt = (num: number): number => Math.round(num);

/**
 * Checks if a number is even.
 * @param {number} num - The number to check.
 * @returns {boolean} - Returns true if the number is even; false otherwise.
 *
 * Example:
 * const isEven = isEven(4); // Output: true
 */
export const isEven = (num: number): boolean => num % 2 === 0;

/**
 * Checks if a number is odd.
 * @param {number} num - The number to check.
 * @returns {boolean} - Returns true if the number is odd; false otherwise.
 *
 * Example:
 * const isOdd = isOdd(5); // Output: true
 */
export const isOdd = (num: number): boolean => num % 2 !== 0;

/**
 * Generates a random number within a specified range.
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (exclusive).
 * @returns {number} - A random number between min (inclusive) and max (exclusive).
 *
 * Example:
 * const randomNum = getRandomNumber(1, 10); // Output: a random number between 1 and 10
 */
export const getRandomNumber = (min: number, max: number): number => {
  if (min >= max) {
    throw new Error('Minimum value must be less than maximum value.');
  }

  return Math.floor(Math.random() * (max - min) + min);
};
