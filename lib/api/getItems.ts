import camelcaseKeys from "camelcase-keys"
import { CredentialsInterface, get } from "../utils/get"
import { getItem } from "./getItem"
import { createSlug } from "../utils/createSlug"

export async function getItems(
  projectId: number,
  credentials: CredentialsInterface
) {
  const buildAPIUrl = (page: number) =>
    `projects/${projectId}/items?page=${page}`

  const firstPageResponse = await get(buildAPIUrl(1), credentials)
  const unFetchedPageCount = [
    ...new Array(firstPageResponse.pagination.totalPages - 1),
  ]
  const promises = unFetchedPageCount.map((p, i: number) => async () => {
    const { data } = await get(buildAPIUrl(i + 2), credentials)
    return data
  })
  const otherPageResponses = await Promise.all(promises.map(p => p()))

  return await Promise.all(
    [
      ...firstPageResponse.data,
      ...otherPageResponses.reduce((acc, val) => [...acc, ...val], []),
    ].map(async i => {
      const itemRes = await getItem(i.id, credentials)

      const reduceFields = (group: any) =>
        group.fields.reduce(
          (acc: any, field: any) => ({
            ...acc,
            [createSlug(field.label, acc)]: itemRes.content[field.uuid],
          }),
          {}
        )

      const itemContent = itemRes.structure.groups.reduce(
        (acc: any, group: any) => ({
          ...acc,
          [createSlug(group.name, acc)]: camelcaseKeys(reduceFields(group), {
            deep: true,
          }),
        }),
        {}
      )

      return {
        ...i,
        ...itemRes,
        slug: createSlug(itemRes.name),
        itemContent,
      }
    })
  )
}
