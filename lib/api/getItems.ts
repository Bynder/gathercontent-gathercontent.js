import camelcaseKeys from "camelcase-keys"
import { CredentialsInterface, get } from "../utils/get"
import { getItem } from "./getItem"

export async function getItems(
  projectId: number,
  credentials: CredentialsInterface
) {
  const firstPageResponse = await get(
    `projects/${projectId}/items`,
    credentials
  );
  const unFetchedPageCount = [
    ...new Array(firstPageResponse.pagination.totalPages - 1),
  ]
  const promises = unFetchedPageCount.map((p, i) => async () => {
    const { data } = await get(`projects/${projectId}/items?page=${i + 2}`, credentials);
    return data;
  })
  const otherPageResponses = await Promise.all(promises.map(p => p()))

  return await Promise.all(
    [
      ...firstPageResponse.data,
      ...otherPageResponses.reduce((acc, val) => [...acc, ...val.data], []),
    ].map(async i => {
      const itemRes = await getItem(i.id, credentials)

      const fields = itemRes.structure.groups.reduce((acc: any, group: any) => [...acc, ...group.fields], [])

      const content = fields.reduce((acc: any, field: any) => ({
        ...acc,
        [field.label]: itemRes.content[field.uuid],
      }), {})

      return {
        ...i,
        ...itemRes,
        content: camelcaseKeys(content),
      }
    })
  )
}
