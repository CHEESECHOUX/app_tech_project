export interface CustomResponse {
    code: number;
    message: string | ((detail?: string) => string);
}

export interface CustomDataResponse<T> extends CustomResponse {
    data: T;
}
