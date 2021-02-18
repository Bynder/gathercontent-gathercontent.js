import axios from "axios"
import camelcaseKeys from "camelcase-keys"

export interface CredentialsInterface {
  email: string
  apiKey: string
}

export async function get(
  url: string,
  credentials: CredentialsInterface,
  headers: object = {}
) {
  const base64credentials = Buffer.from(
    `${credentials.email}:${credentials.apiKey}`
  ).toString("base64")

  const response = await axios.get(`https://api.gathercontent.com/${url}`, {
    headers: {
      Accept: "application/vnd.gathercontent.v2+json",
      Authorization: `Basic ${base64credentials}`,
      ...headers,
    },
  })

  return camelcaseKeys(response.data, {
    deep: true,
    stopPaths: ["data.content"],
  })
}
