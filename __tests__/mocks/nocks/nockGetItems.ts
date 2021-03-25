import { createAPIItemMock } from "../api/item"
import { ProjectInterface } from "../../../lib/types/project"
import { ItemInterface } from "../../../lib/types/item"

const apiItemMock1: ItemInterface = createAPIItemMock({
  id: 1,
  name: "test / item",
  folder_uuid: "folder-1",
})

const apiItemMock2: ItemInterface = createAPIItemMock({
  id: 2,
  name: "test item 2",
  structure: {
    groups: [
      {
        name: "Content",
        fields: [],
      },
    ],
  },
  folder_uuid: "folder-1",
})

export function nockGetItems(
  apiNock: any,
  projectMock: ProjectInterface,
  page1ItemMocks = [apiItemMock1],
  page2ItemMocks = [apiItemMock2]
) {
  apiNock.get(`/projects/${projectMock.id}/items?page=1`).reply(200, {
    data: page1ItemMocks,
    pagination: {
      page: 1,
      totalPages: 2,
    },
  })

  apiNock.get(`/projects/${projectMock.id}/items?page=2`).reply(200, {
    data: page2ItemMocks,
    pagination: {
      page: 2,
      totalPages: 2,
    },
  })

  return [page1ItemMocks, page2ItemMocks]
}
