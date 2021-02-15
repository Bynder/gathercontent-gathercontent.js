import { credentialsInterface, get } from '../utils/get';

export async function getStructure(structureUuid: string, credentials: credentialsInterface) {
    return await get(`structures/${structureUuid}`, credentials);
}