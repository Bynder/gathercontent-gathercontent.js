import { CredentialsInterface, get } from "../utils/get"
import { createSlug } from "../utils/createSlug"

export async function getProject(
  projectId: number,
  credentials: CredentialsInterface
) {
  const { data } = await get(`projects/${projectId}`, credentials, {
    Accept: "application/vnd.gathercontent.v0.5+json",
  })

  return {
    ...data,
    statuses: {
      data: data.statuses.data.map((s: any) => ({
        ...s,
        slug: createSlug(s.name),
      })),
    },
  }
}
