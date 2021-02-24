import slugify from "slugify"
import camelcaseKeys from "camelcase-keys"

export function createSlug(string: string, existingSlugs: any = {}, convertToCamelCase = false,) {
  const lowerCased = string.toLowerCase()
  const slugged = slugify(lowerCased, { remove: /[*+~.,()/'"!:@]/g })
  const convertedSlug = convertToCamelCase ? Object.keys(camelcaseKeys({ [slugged]: string }))[0] : slugged
  const duplicateKeys = Object.keys(existingSlugs).filter(slug => slug === convertedSlug)

  return duplicateKeys.length ? `${convertedSlug}${duplicateKeys.length + 1}` : convertedSlug
}
