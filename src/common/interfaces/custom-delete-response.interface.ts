export interface CustomDeleteResponse {
    code: number;
    message: string | ((detail?: string) => string);
}
