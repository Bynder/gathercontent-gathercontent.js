import { ItemInterface } from "../../../lib/types/item"

export function nockGetItem(apiNock: any, itemMock: ItemInterface) {
  const item = itemMock

  apiNock.get(`/items/${itemMock.id}?include=structure`).reply(200, {
    data: item,
  })

  return item
}
