import { credentialsInterface, get } from '../utils/get';

export async function getTemplates(projectId: number, credentials: credentialsInterface) {
    return await get(`projects/${projectId}/templates`, credentials);
}