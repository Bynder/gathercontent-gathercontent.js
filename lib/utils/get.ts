import axios from "axios"
import * as rax from "retry-axios"
import rateLimit from "axios-rate-limit"
import { convertKeys } from "./convertKeys"

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

  const axiosInstance = axios.create()
  axiosInstance.defaults.raxConfig = {
    instance: axiosInstance,
  }
  rax.attach(axiosInstance)
  const http = rateLimit(axiosInstance, {
    maxRequests: 250,
    perMilliseconds: 15000,
  })
  const response = await http.get(`https://api.gathercontent.com/${url}`, {
    headers: {
      Accept: "application/vnd.gathercontent.v2+json",
      Authorization: `Basic ${base64credentials}`,
      ...headers,
    },
  })

  return convertKeys(response.data)
}
