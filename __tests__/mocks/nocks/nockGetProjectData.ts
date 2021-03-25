import { nockGetProject } from "./nockGetProject"
import { nockGetFolders } from "./nockGetFolders"
import { nockGetItems } from "./nockGetItems"
import { nockGetItem } from "./nockGetItem"
import { nockGetTemplates } from "./nockGetTemplates"
import { getProjectData } from "../../../lib"

export async function nockGetProjectData(apiNock: any) {
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
