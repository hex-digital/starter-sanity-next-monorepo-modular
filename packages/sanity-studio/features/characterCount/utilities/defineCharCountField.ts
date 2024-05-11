import { StringInput } from '../components/StringInput';
import { TextInput } from '../components/TextInput';
import { StringCountSchemaDefinition, TextCountSchemaDefinition } from '../types';

export function defineStringCountField(schemaTypeDefinition: Omit<StringCountSchemaDefinition, 'type'>): StringCountSchemaDefinition {
  return {
    ...schemaTypeDefinition,
    type: 'string',
    components: { input: StringInput },
  };
}

export function defineTextCountField(schemaTypeDefinition: Omit<TextCountSchemaDefinition, 'type'>): TextCountSchemaDefinition {
  return {
    ...schemaTypeDefinition,
    type: 'text',
    components: { input: TextInput },
  };
}
