export function withFieldset<T>(name: string, fields: Array<T>): Array<T> {
  return fields.map((field) => ({
    ...field,
    fieldset: name,
  }))
}

export function withGroup<T>(name: string, fields: Array<T>): Array<T> {
  return fields.map((field) => ({
    ...field,
    group: name,
  }))
}

export function withProps<T>(props: Record<string, any>, fields: Array<T>): Array<T> {
  return fields.map((field) => ({
    ...field,
    ...props,
  }))
}
