import type { ConditionalPropertyCallbackContext } from 'sanity';

export function ifParentIsNot(fieldName: string, fieldValue: any) {
  return ({ parent }: ConditionalPropertyCallbackContext) => parent?.[fieldName] !== fieldValue;
}
