import { Module } from '@nestjs/common';
import { CashController } from '@src/cash/cash.controller';
import { CashService } from '@src/cash/cash.service';
import { CashRecordRepository } from '@src/cash/cash-record.repository';
import { CashRecordDetailRepository } from '@src/cash/cash-record-detail.repository';

@Module({
    controllers: [CashController],
    providers: [CashService, CashRecordRepository, CashRecordDetailRepository],
})
export class CashModule {}
