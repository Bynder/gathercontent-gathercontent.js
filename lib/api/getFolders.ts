import { CredentialsInterface, get } from "../utils/get"

export async function getFolders(
  projectId: number,
  credentials: CredentialsInterface
) {
  const { data } = await get(`projects/${projectId}/folders`, credentials)
  return data
}
