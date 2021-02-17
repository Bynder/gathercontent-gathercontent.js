import { CredentialsInterface } from "./utils/get"
import { getFolders } from "./api/getFolders"
import { getItems } from "./api/getItems"
import { getTemplates } from "./api/getTemplates"

export async function getProject(
  projectId: number,
  credentials: CredentialsInterface
) {
  const values = await Promise.all([
    getFolders(projectId, credentials),
    getItems(projectId, credentials),
    getTemplates(projectId, credentials),
  ])

  return {
    folders: values[0],
    items: values[1],
    templates: values[2],
  }
}
