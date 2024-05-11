import { customAlphabet } from 'nanoid';

/**
 * Generate a key for use with Sanity field keys (presence)
 */
export const generateItemKey = customAlphabet(
  '0123456789abcdefghijklmnopqrstuvwxyz',
  12
);

/**
 * Tokenize a string for things like search
 */
export function tokenize(string: string) {
  return string
    .split(/[\s.-]/g)
    .flatMap((segment) => {
      const acceptedCharacters = [
        'a-z', // lower-case letters
        '0-9', // numbers
      ];

      return segment
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(new RegExp(`[^${acceptedCharacters.join('')}]`, 'g'), '')
        .replace(/\s+/g, '-')
        .trim() || [];
  });
}
