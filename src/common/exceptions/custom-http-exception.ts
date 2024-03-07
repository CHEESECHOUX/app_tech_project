import { HttpException } from '@nestjs/common';

export class CustomHttpException extends HttpException {
    constructor(
        public customMessage: string | ((detail?: string) => string),
        public customStatusCode: number,
    ) {
        super(customMessage, customStatusCode);
    }
}
