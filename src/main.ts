import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { AllExceptionsFilter } from '@src/common/exceptions/all-exceptions.filter';
import { HttpLoggingInterceptor } from '@src/common/interceptors/http-logging.interceptor';
import { CustomLogger } from '@src/common/log/custom-logger';

const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'], // OPTIONS : Preflight Request
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // 쿠키, 인증, 헤더 사용가능 여부
};

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new CustomLogger(),
    });

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
    app.enableCors(corsOptions);

    await app.listen(3000);
}
bootstrap();
