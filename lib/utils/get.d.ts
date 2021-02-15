export interface credentialsInterface {
    email: string;
    apiKey: string;
}
export declare function get(url: string, credentials: credentialsInterface): Promise<any>;
