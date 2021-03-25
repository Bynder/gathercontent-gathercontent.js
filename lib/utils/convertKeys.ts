import camelcaseKeys from "camelcase-keys"

export function convertKeys(data: any) {
  return camelcaseKeys(data, {
    deep: true,
    stopPaths: ["data.content", "content"],
  })
}
