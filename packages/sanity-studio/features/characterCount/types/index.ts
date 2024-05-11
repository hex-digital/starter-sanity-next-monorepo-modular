import type { StringDefinition, StringOptions, TextDefinition, TextOptions } from 'sanity';

/**
 * You can also pass any of the properties of Sanity object types described here: https://www.sanity.io/docs/string-type
 */
export interface StringCountSchemaDefinition extends Omit<StringDefinition, 'options'> {
  options?: StringOptions & CharCountOptions;
}

/**
 * You can also pass any of the properties of Sanity object types described here: https://www.sanity.io/docs/text-type
 */
export interface TextCountSchemaDefinition extends Omit<TextDefinition, 'options'> {
  options?: TextOptions & CharCountOptions;
}

export interface CharCountOptions {
  minLength?: number;
  maxLength?: number;
}
