import { Module } from '@nestjs/common';
import { QuestionsController } from '@src/questions/questions.controller';
import { QuestionsService } from '@src/questions/questions.service';

@Module({
    controllers: [QuestionsController],
    providers: [QuestionsService],
})
export class QuestionsModule {}
