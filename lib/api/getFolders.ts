import { credentialsInterface, get } from '../utils/get';

export async function getFolders(projectId: number, credentials: credentialsInterface) {
    return await get(`projects/${projectId}/folders`, credentials);
}