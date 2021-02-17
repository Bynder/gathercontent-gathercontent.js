import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

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

  return camelcaseKeys(response.data, {
    deep: true,
    stopPaths: ['data.content'],
  });
}
