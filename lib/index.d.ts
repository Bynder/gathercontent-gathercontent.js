import { credentialsInterface } from './utils/get';
export declare function getProject(projectId: number, credentials: credentialsInterface): Promise<{
    folders: any;
    items: any;
    templates: any;
}>;
