import { CredentialsInterface } from "./utils/get"
import { getFolders } from "./api/getFolders"
import { getItems } from "./api/getItems"
import { getTemplates } from "./api/getTemplates"
import { getProject } from "./api/getProject"

export async function getProjectData(
  projectId: number,
  credentials: CredentialsInterface,
) {
  const values = await Promise.all([
    getProject(projectId, credentials),
    getFolders(projectId, credentials),
    getItems(projectId, credentials),
    getTemplates(projectId, credentials),
  ])

  return {
    project: values[0],
    folders: values[1],
    items: values[2],
    templates: values[3],
  }
}
