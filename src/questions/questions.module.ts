import { Module } from '@nestjs/common';
import { QuestionsController } from '@src/questions/questions.controller';
import { QuestionsService } from '@src/questions/questions.service';
import { QuestionsRepository } from '@src/questions/questions.repository';
import { CashService } from '@src/cash/cash.service';
import { UsersRepository } from '@src/users/users.repository';
import { CashRecordRepository } from '@src/cash/cash-record.repository';
import { CashRecordDetailRepository } from '@src/cash/cash-record-detail.repository';

@Module({
    controllers: [QuestionsController],
    providers: [QuestionsService, QuestionsRepository, CashService, CashRecordRepository, CashRecordDetailRepository, UsersRepository],
})
export class QuestionsModule {}
