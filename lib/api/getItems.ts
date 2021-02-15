import { credentialsInterface, get } from '../utils/get';

export async function getItems(projectId: number, credentials: credentialsInterface) {
    return await get(`projects/${projectId}/items`, credentials);
}