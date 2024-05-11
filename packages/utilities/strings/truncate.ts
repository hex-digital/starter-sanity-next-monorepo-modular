export function truncate(string: string, maxLength: number, ellipsis: string = '...') {
  if (string.length < maxLength) {
    return string;
  }

  // To prevent truncating in the middle of words,
  // we get the position of the first whitespace after the truncation
  const firstWhitespaceAfterTruncation = string.slice(maxLength).search(/\s/) + maxLength;

  return string.slice(0, firstWhitespaceAfterTruncation) + ellipsis;
}
