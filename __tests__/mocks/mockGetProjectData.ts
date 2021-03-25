import { nockGetProject } from "./nocks/nockGetProject"
import { nockGetFolders } from "./nocks/nockGetFolders"
import { nockGetItems } from "./nocks/nockGetItems"
import { nockGetItem } from "./nocks/nockGetItem"
import { nockGetTemplates } from "./nocks/nockGetTemplates"
import { getProjectData } from "../../lib"

export async function mockGetProjectData(apiNock: any) {
  const project = nockGetProject(apiNock)
  const [page1Items, page2Items] = nockGetItems(apiNock, project)

  nockGetFolders(apiNock, project)
  nockGetItem(apiNock, page1Items[0])
  nockGetItem(apiNock, page2Items[0])
  nockGetTemplates(apiNock, project)

  const data = await getProjectData(project.id, {
    apiKey: "fake",
    email: "fake",
  })

  return data
}
