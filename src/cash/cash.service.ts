import { Injectable } from '@nestjs/common';
import { CashRecordRepository } from '@src/cash/cash-record.repository';
import { CashRecordDetailRepository } from '@src/cash/cash-record-detail.repository';

@Injectable()
export class CashService {
    constructor(
        private readonly cashRecordRepository: CashRecordRepository,
        private readonly cashRecordDetailRepository: CashRecordDetailRepository,
    ) {}

    async awardCashRecord(userId: number, questionPoint: number): Promise<void> {
        try {
            const cashRecord = await this.cashRecordRepository.create(userId, questionPoint);
            const cashRecordId = cashRecord.id;

            const cashRecordDetail = await this.cashRecordDetailRepository.create(userId, questionPoint, cashRecordId);
            const cashRecordDetailId = cashRecordDetail.id;

            const updatePKcashRecordDetail = await this.cashRecordDetailRepository.updatePK(cashRecordDetailId);
        } catch (error) {
            console.error('awardCashRecord 에러: ', error);
            throw new Error('awardCashRecord 에러: ' + error);
        }
    }
}
