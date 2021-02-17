import { credentialsInterface } from './utils/get';
import { getFolders } from "./api/getFolders";
import { getItems } from "./api/getItems";
import { getTemplates } from "./api/getTemplates";

export async function getProject(projectId: number, credentials: credentialsInterface) {
    const values = await Promise.all([
        getFolders(projectId, credentials),
        getItems(projectId, credentials),
        getTemplates(projectId, credentials),
    ]);

    return {
        folders: values[0].data,
        items: values[1],
        templates: values[2].data,
    };
}