import { ItemInterface } from "../../../lib/types/item"

export function createAPIItemMock(overrides = {}): ItemInterface {
  return {
    id: 1,
    name: "test / item",
    position: 1,
    status_id: 1,
    template_id: 1,
    content: {
      "field-1-uuid": "hello world",
      "field-2-uuid": "hello world again",
    },
    structure: {
      groups: [
        {
          name: "Meta data",
          fields: [
            {
              uuid: "field-1-uuid",
              label: "description",
            },
          ],
        },
        {
          name: "Meta data",
          fields: [
            {
              uuid: "field-2-uuid",
              label: "description",
            },
          ],
        },
      ],
    },
    ...overrides,
  }
}
