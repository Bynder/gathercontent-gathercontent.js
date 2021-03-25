import nock from "nock"
import { getProjectData } from "../lib"
import { createSlug } from "../lib/utils/createSlug"
import { convertKeys } from "../lib/utils/convertKeys"
import { omit } from "../lib/utils/omit"
import { nockGetProject } from "./mocks/nocks/nockGetProject"
import { nockGetItems } from "./mocks/nocks/nockGetItems"
import { nockGetFolders } from "./mocks/nocks/nockGetFolders"
import { nockGetItem } from "./mocks/nocks/nockGetItem"
import { nockGetTemplates } from "./mocks/nocks/nockGetTemplates"

test("getting data for a project", async () => {
  const apiNock = nock(/gathercontent\.com/).persist()
  const project = nockGetProject(apiNock)
  const [page1Items, page2Items] = nockGetItems(apiNock, project)
  const folders = nockGetFolders(apiNock, project)
  const item1 = nockGetItem(apiNock, page1Items[0])
  const item2 = nockGetItem(apiNock, page2Items[0])
  const templates = nockGetTemplates(apiNock, project)

  const sanitisedFolder1 = omit(
    ["parent_uuid", "folder_uuid"],
    convertKeys(folders[0])
  )
  const sanitisedFolder2 = omit(
    ["parent_uuid", "folder_uuid"],
    convertKeys(folders[1])
  )

  const sanitisedItem1 = omit(["status_id", "template_id"], convertKeys(item1))
  const sanitisedItem2 = omit(["status_id", "template_id"], convertKeys(item2))

  const expected = {
    project: {
      ...project,
      statuses: {
        data: [
          {
            ...project.statuses.data[0],
            slug: createSlug(project.statuses.data[0].name),
          },
        ],
      },
    },
    folders: [
      {
        ...sanitisedFolder1,
        slug: createSlug(sanitisedFolder1.name),
      },
      {
        ...sanitisedFolder2,
        slug: createSlug(sanitisedFolder2.name),
        parentUuid: sanitisedFolder1.uuid,
      },
    ],
    templates: [
      {
        ...templates[0],
        slug: createSlug(templates[0].name),
      },
    ],
    items: [
      {
        ...sanitisedItem1,
        slug: createSlug(sanitisedItem1.name),
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
        ...sanitisedItem2,
        slug: createSlug(sanitisedItem2.name),
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
