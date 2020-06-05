export const parseReadingsFromGoogleText = (input: string): { ok: boolean, value: number } => {
  if (!input) {
    return {ok: false, value: 0}
  }

  const resultStrategy1 = strategy1(input);
  if (resultStrategy1.ok) {
    return resultStrategy1;
  }

  const resultStrategy2 = strategy2(input);
  return resultStrategy2;
}

/**
 * Reading is on the same line as 'M15' string
 */
const strategy1 = (input: string): { ok: boolean, value: number } => {
  const splitted = input.split('\n')
  const index = splitted.findIndex(s => s === 'M15') + 1 // newline after 'M15' contains reading on my photo's
  const line = splitted[index]

  return parseRawReading(line);
}

/**
 * Reading is on the next line after 'M15' string
 */
const strategy2 = (input: string): { ok: boolean, value: number } => {
  const splitted = input.split('\n')
  const index = splitted.findIndex(s => s.startsWith('M15')) // newline after 'M15' contains reading on my photo's
  const line = splitted[index]

  return parseRawReading(line);
}

/**
 * Examples:
 * - "0 0 2 7:3:3"
 * - "0 0 2 7:3"
 * - "0 0.2 7:3"
 *
 * Or sometimes, it prepends the other numbers on the same line,
 * So make sure we only start parsing from the first zero
 * - "1383 0.0.2.7.3"
 *
 * Sometimes, the 'M15' string is put as prefix:
 * - "M15 00274770"
 */
const parseRawReading = (line: string): { ok: boolean, value: number } => {
  if (!line) {
    return {ok: false, value: 0}
  }
  const numbers = line.match(/\d+/g)
  if (!numbers || numbers.length === 0) {
    return {ok: false, value: 0}
  }
  const numberString = numbers.join('')

  // first remove all numbers BEFORE the first 0.
  const zeroIndex = numberString.indexOf('0')
  const newNumberString = numberString.substr(zeroIndex)

  if (newNumberString.length < 5) { // uncertain response, return false with result
    return {ok: false, value: Number(newNumberString)}
  }

  if (numberString.length === 5) {
    return {ok: true, value: Number(newNumberString)}
  }

  return {ok: true, value: Number(newNumberString.substr(0, 5))} // don't care about values after the comma
}
