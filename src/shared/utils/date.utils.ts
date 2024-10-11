import { DateTime } from 'luxon';

/**
 * Enum for predefined date and time formats usable with Luxon.
 *
 * This enum defines various commonly used date and time formats.
 * It can be used to format dates consistently throughout
 * the application.
 *
 * - `ISO`: Standard ISO format (e.g., `2024-09-30`).
 * - `SHORT`: Short format typically used in the United States (e.g., `09/30/2024`).
 * - `LONG`: Long format with the full month name and day (e.g., `September 30, 2024`).
 * - `TIME`: Format for time in 24-hour format (e.g., `15:45:00`).
 * - `FULL_DATE`: Full date format with weekday, month, day, and year (e.g., `Sunday, September 30, 2024`).
 * - `DATE_TIME`: Combined date and time format (e.g., `2024-09-30 15:45:00`).
 * - `DATE_TIME_SHORT`: Short combined date and time format (e.g., `09/30/2024 15:45`).
 * - `MONTH_DAY`: Format for month and day (e.g., `September 30`).
 * - `YEAR_MONTH`: Format for year and month (e.g., `2024-09`).
 * - `MONTH_YEAR`: Format for month and year (e.g., `September 2024`).
 * - `HUMAN_READABLE`: A more descriptive date format (e.g., `September 30, 2024 at 03:45 PM`).
 * - `RFC2822`: RFC 2822 formatted date (e.g., `Sun, 30 Sep 2024 15:45:00 +0000`).
 * - `TIMESTAMP`: Unix timestamp format (e.g., `1696086300`).
 */
export enum DateFormat {
  ISO = 'yyyy-MM-dd',
  SHORT = 'MM/dd/yyyy',
  LONG = 'MMMM dd, yyyy',
  TIME = 'HH:mm:ss',
  FULL_DATE = 'cccc, MMMM d, yyyy',
  DATE_TIME = 'yyyy-MM-dd HH:mm:ss',
  DATE_TIME_SHORT = 'MM/dd/yyyy HH:mm',
  MONTH_DAY = 'MMMM d',
  YEAR_MONTH = 'yyyy-MM',
  MONTH_YEAR = 'MMMM yyyy',
  RFC2822 = 'EEE, dd MMM yyyy HH:mm:ss Z',
  TIMESTAMP = 'epoch',
}

/**
 * Formats a JavaScript Date object into a specific date format.
 *
 * @param date - The Date object to format.
 * @param format - The format string or Luxon's format options.
 * @returns A string representing the date in the specified format.
 */
export const formatDateWithFormat = (
  date: Date,
  format: DateFormat,
): string => {
  return DateTime.fromJSDate(date).toFormat(format);
};

/**
 * Gets the difference in days between two dates.
 *
 * @param startDate - The start date.
 * @param endDate - The end date.
 * @returns The number of days between the two dates.
 */
export const getDaysDifference = (startDate: Date, endDate: Date): number => {
  const start: DateTime = DateTime.fromJSDate(startDate);
  const end: DateTime = DateTime.fromJSDate(endDate);

  return end.diff(start, 'days').days;
};

/**
 * Checks if a given date is in the past.
 *
 * @param date - The date to check.
 * @returns True if the date is in the past, false otherwise.
 */
export const isDateInPast = (date: Date): boolean => {
  return DateTime.fromJSDate(date) < DateTime.local();
};
