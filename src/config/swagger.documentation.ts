import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function swaggerDocumentation(app) {
    const config = new DocumentBuilder()
        .setTitle('AppTech Project API')
        .setDescription('AppTech Project API 문서 - development')
        .setVersion('1.0')
        .addTag('API')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
}
