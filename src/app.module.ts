import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${__dirname}/config/env/.env.${process.env.NODE_ENV}`,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid('development', 'production').default('development'),
                PORT: Joi.number().default(3000),
            }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
