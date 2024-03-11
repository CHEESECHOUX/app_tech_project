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
                            data,
                        },
                    }),
                );

                return data;
            }),
        );
    }
}
