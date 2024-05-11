import { ArrayOfObjectsInputProps } from 'sanity';

export function getBlockInitialValues(blockName: string, fieldProps: ArrayOfObjectsInputProps) {
  let defaultInitialValues = {};

  const blockSchema = fieldProps.schemaType.of.find((blockSchema) => blockSchema.name === blockName);

  if (blockSchema && blockSchema.jsonType === 'object') {
    defaultInitialValues = blockSchema.fields.reduce(
      (acc, blockField) => {
        const fallbacks: Record<string, any> = {
          'array': [],
          'object': {},
        };

        // Some fields need must have a value to prevent errors when adding content before a page refresh, such as "array"
        const fallbackValue = blockField.type.jsonType in fallbacks
          ? fallbacks[blockField.type.jsonType]
          : undefined;

        return {
          ...acc,
          [blockField.name]: blockField.type.initialValue ?? fallbackValue,
        }
      },
      {}
    );
  }

  // @todo consider making this generic and handling other jsonType's, rather than just 'object'

  return defaultInitialValues;
}
