import nock from "nock"
import { getProjectData } from "../lib"

test("getting data for a project", async () => {
  const project = {
    id: 1,
    statuses: { data: [] }
  };

  const itemMock = {
    id: 1,
    name: "test item",
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
  }
  const itemMock2 = {
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
  }

  nock("https://api.gathercontent.com")
    .get(`/projects/${project.id}`)
    .reply(200, {
      data: project,
    })

  nock("https://api.gathercontent.com")
    .get(`/projects/${project.id}/folders`)
    .reply(200, { data: [{ name: "Project folder" }] })

  nock("https://api.gathercontent.com")
    .get(`/projects/${project.id}/items?page=1`)
    .reply(200, {
      data: [itemMock],
      pagination: {
        page: 1,
        totalPages: 2,
      },
    })

  nock("https://api.gathercontent.com")
    .get(`/projects/${project.id}/items?page=2`)
    .reply(200, {
      data: [itemMock2],
      pagination: {
        page: 2,
        totalPages: 2,
      },
    })

  nock("https://api.gathercontent.com")
    .get(`/projects/${project.id}/templates`)
    .reply(200, { data: [] })

  nock("https://api.gathercontent.com")
    .get(`/items/1?include=structure`)
    .reply(200, {
      data: itemMock,
    })

  nock("https://api.gathercontent.com")
    .get(`/items/2?include=structure`)
    .reply(200, {
      data: itemMock2,
    })

  const expected = {
    project,
    folders: [{ name: "Project folder", slug: "projectFolder" }],
    templates: [],
    items: [
      {
        ...itemMock,
        slug: "testItem",
        itemContent: {
          metaData: {
            description: "hello world",
          },
          metaData2: {
            description: "hello world again",
          },
        },
      },
      {
        ...itemMock2,
        slug: "testItem2",
        itemContent: {
          content: {},
        },
      },
    ],
  }

  const result = await getProjectData(1, {
    email: "hello@world.com",
    apiKey: "apiKey",
  })

  expect(result).toEqual(expected)
})
