import { CredentialsInterface, get } from "../utils/get"
import { createSlug } from "../utils/createSlug"

export async function getFolders(
  projectId: number,
  credentials: CredentialsInterface
) {
  const { data } = await get(`projects/${projectId}/folders`, credentials)

  return data.map((d: any) => ({
    ...d,
    slug: createSlug(d.name),
  }))
}
