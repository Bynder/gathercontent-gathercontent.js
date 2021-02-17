import { CredentialsInterface, get } from "../utils/get"

export async function getTemplates(
  projectId: number,
  credentials: CredentialsInterface
) {
  const { data } = await get(`projects/${projectId}/templates`, credentials)
  return data
}
