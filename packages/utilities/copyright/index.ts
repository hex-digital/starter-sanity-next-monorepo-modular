/**
 * Determine the current copyright year or range to display, based on the original copyright year and the current year
 * E.G.
 *   For current year 2023 and copyright year 2023, show "2023"
 *   For current year 2023 and copyright year 2020, show "2020—2023", and if a delimiter is passed, use that to delimit the numbers
 *
 * @param inputYear The original copyright year to compare to
 * @param delimiter The delimiter to separate the two years, defaults to "—"
 */
export function copyrightYear(inputYear: string, delimiter: string = '—'): string {
  // Get the current year as a string
  const currentYear = new Date().getFullYear().toString();

  return inputYear === currentYear ? currentYear : `${inputYear}${delimiter}${currentYear}`;
}
