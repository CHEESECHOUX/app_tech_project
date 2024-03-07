import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

import { CustomHttpException } from './custom-http-exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: HttpException | Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();

        // 두 가지 버전을 if else문으로 분리
        // 1. 커스터마이징한 CustomHttpStatusCodes 로 처리할 경우
        if (exception instanceof CustomHttpException) {
            const customStatusCode = exception.customStatusCode;
            const customMessage = exception.customMessage;

            const responseBody = {
                statusCode: customStatusCode,
                message: customMessage,
                timestamp: new Date().toISOString(),
                path: req.url,
            };

            this.logger.error(responseBody, exception instanceof Error ? exception.stack : undefined);

            res.status(customStatusCode).json(responseBody);

            // 2. 일반적으로 처리하는 HttpException, Error 객체 처리할 경우
        } else {
            // 상태 코드 결정
            const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

            // 예외 유형에 따라 statusCode, message 결정
            let response: any;
            // HttpException 인스턴스인 경우, HttpException 객체에서 정의된 응답 객체 생성
            if (exception instanceof HttpException) {
                response = exception.getResponse();
                // 일반 Error 인스턴스인 경우, Error 객체의 message 속성으로 응답 객체 생성
            } else {
                response = {
                    message: exception.message,
                };
            }

            const responseBody = {
                statusCode: status,
                ...response, // 스프레드 연산자를 사용하여 responseBody 객체의 최상위 레벨에 추가
                timestamp: new Date().toISOString(),
                path: req.url,
            };

            this.logger.error(responseBody, exception instanceof Error ? exception.stack : undefined);

            res.status(status).json(responseBody);
        }
    }
}
