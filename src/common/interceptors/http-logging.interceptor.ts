import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
    private logger = new Logger(HttpLoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const httpContext = context.switchToHttp();

        const { method, originalUrl, query, params, body } = httpContext.getRequest();

        return next.handle().pipe(
            map(data => {
                this.logger.log(
                    JSON.stringify({
                        request: {
                            method,
                            originalUrl,
                            query,
                            params,
                            body,
                        },
                        response: {
                            // custom으로 만든 statusCode를 넘겨주고 있어서 주석처리
                            // statusCode: httpContext.getResponse().statusCode,
                            data,
                        },
                    }),
                );

                return {
                    response: data,
                    // response: { statusCode: httpContext.getResponse().statusCode },
                };
            }),
        );
    }
}
