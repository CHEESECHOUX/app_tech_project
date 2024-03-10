import { Module } from '@nestjs/common';
import { QuestionsController } from '@src/questions/questions.controller';
import { QuestionsService } from '@src/questions/questions.service';
import { QuestionsRepository } from '@src/questions/questions.repository';

@Module({
    controllers: [QuestionsController],
    providers: [QuestionsService, QuestionsRepository],
})
export class QuestionsModule {}
