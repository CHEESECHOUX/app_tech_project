import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptions/all-exceptions.filter';
import { HttpLoggingInterceptor } from './common/interceptors/http-logging.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new AllExceptionsFilter());

    app.useGlobalInterceptors(new HttpLoggingInterceptor());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true, // 원시 타입의 데이터를 DTO 클래스의 인스턴스로 변환
            whitelist: true, // DTO에 정의되지 않은 속성이 요청 본문에 있을 경우, 자동으로 제거
            transformOptions: { enableImplicitConversion: false }, // 타입 변환을 암시적으로 수행
            disableErrorMessages: false,
        }),
    );

    await app.listen(3000);
}
bootstrap();
