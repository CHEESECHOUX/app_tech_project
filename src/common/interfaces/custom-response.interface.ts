export interface CustomResponse<T> {
    code: number;
    message: string | ((detail?: string) => string);
    data: T;
}
