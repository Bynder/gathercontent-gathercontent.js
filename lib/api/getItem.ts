import { CredentialsInterface, get } from "../utils/get"

export async function getItem(
  itemId: number,
  credentials: CredentialsInterface
) {
  const { data } = await get(`items/${itemId}?include=structure`, credentials)
  return data
}
