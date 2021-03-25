export function omit(keys: any[], obj: any): any {
  if (!keys.length) return obj
  const { [keys.pop()]: omitted, ...rest } = obj
  return omit(keys, rest)
}
