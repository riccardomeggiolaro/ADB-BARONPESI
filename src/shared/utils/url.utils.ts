/**
 * Generates a full web link by combining a base URL, paths, and optional query parameters.
 *
 * @param {string} baseUrl - The base URL to which the paths will be appended.
 * @param {string[]} paths - An array of path segments to be included in the URL.
 * @param {Record<string, string | number | boolean>} [queryParams] - Optional query parameters to be added to the URL.
 * @returns {string} The complete URL as a string.
 * @throws {Error} Throws an error if the base URL is invalid or malformed.
 */
export function generateFullWebLink(
  baseUrl: string,
  paths: string[],
  queryParams?: Record<string, string | number | boolean>,
): string {
  // Basic validation for the base URL
  if (!/^https?:\/\/.+/i.test(baseUrl)) {
    throw new Error(`Invalid base URL: ${baseUrl}`);
  }

  // Create the full path by joining the provided paths
  const urlPath: string = paths.join('/');

  // Construct the complete URL
  const url: URL = new URL(urlPath, baseUrl);

  // Append query parameters, if provided
  if (queryParams) {
    Object.keys(queryParams).forEach((key: string) => {
      url.searchParams.append(key, String(queryParams[key]));
    });
  }

  return url.toString();
}
