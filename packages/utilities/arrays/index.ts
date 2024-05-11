/**
 * A callback function to check if values in an array are unique.
 * E.G.
 *   const isUnique = someArray.every(isUnique);
 */
export function isUnique<Key, Type>(value: Type, _index: any, array: Array<Type>) {
  return array.indexOf(value) === array.lastIndexOf(value);
}

export function isNotUnique<Key, Type>(value: Type, _index: any, array: Array<Type>) {
  return array.indexOf(value) !== array.lastIndexOf(value);
}
