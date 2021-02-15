import { credentialsInterface, get } from '../utils/get';

export async function getItem(itemId: number, credentials: credentialsInterface) {
    return await get(`items/${itemId}?is_archived=false`, credentials);
}