import { CredentialsInterface, get } from "../utils/get"
import { createSlug } from "../utils/createSlug"

export async function getTemplates(
  projectId: number,
  credentials: CredentialsInterface
) {
  const { data } = await get(`projects/${projectId}/templates`, credentials)

  return data.map((d: any) => ({
    ...d,
    slug: createSlug(d.name),
  }))
}
