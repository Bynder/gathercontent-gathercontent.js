import slugify from "slugify"
import camelcaseKeys from "camelcase-keys"

export function createSlug(string: string, existingSlugs: any = {}) {
  const lowerCased = string.toLowerCase()
  const slugged = slugify(lowerCased, { remove: /[*+~.,()'"!:@]/g })
  const cased = Object.keys(camelcaseKeys({ [slugged]: string }))[0]
  const slugKeys = Object.keys(existingSlugs)

  return slugKeys.indexOf(cased) > -1 ? `${cased}${slugKeys.length + 1}` : cased
}
