import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import * as Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${__dirname}/config/env/.env.${process.env.NODE_ENV}`,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid('development', 'production').default('development'),
                PORT: Joi.number().default(3000),
            }),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('MYSQL_HOST'),
                port: configService.get('MYSQL_PORT'),
                username: configService.get('MYSQL_USERNAME'),
                password: configService.get('MYSQL_PASSWORD'),
                database: configService.get('MYSQL_NAME'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: false, // 스키마 업데이트(데이터 삭제될 수 있음 주의)
                autoLoadEntities: true, // 모듈 내에 정의된 엔티티 자동으로 로드
                logging: true,
                namingStrategy: new SnakeNamingStrategy(), // raw query를 사용하면 적용이 안 됨
                useUTC: true, // UTC 시간 사용
                timezone: 'Z', // UTC 시간대
            }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
