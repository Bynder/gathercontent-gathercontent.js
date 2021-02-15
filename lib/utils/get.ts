import axios from 'axios';

export interface credentialsInterface {
  email: string,
  apiKey: string,
}

export async function get(url: string, credentials: credentialsInterface) {
  const base64credentials = Buffer.from(`${credentials.email}:${credentials.apiKey}`).toString('base64');

  const response = await axios.get(`https://api.gathercontent.com/${url}`, {
    headers: {
      Accept: 'application/vnd.gathercontent.v2+json',
      Authorization: `Basic ${base64credentials}`,
    },
  });

  return response.data
}
