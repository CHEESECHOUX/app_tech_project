import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CashRecordDetail } from '@src/cash/entity/cash-record-detail.entity';

@Injectable()
export class CashRecordDetailRepository {
    private repository: Repository<CashRecordDetail>;

    constructor(private readonly dataSource: DataSource) {
        this.repository = dataSource.getRepository(CashRecordDetail);
    }

    async create(userId: number, questionPoint: number, cashRecordId: number): Promise<CashRecordDetail> {
        const cashRecordDetail = this.repository.create({
            userId: userId,
            amount: questionPoint,
            status: 'add',
            cashRecordId: cashRecordId,
        });

        await this.repository.save(cashRecordDetail);

        return cashRecordDetail;
    }

    async updatePK(cashRecordDetailId: number): Promise<CashRecordDetail> {
        const rawQuery = `
            UPDATE cash_record_detail AS crd
            SET cash_record_detail_id = ?
            WHERE crd.id = ?
        `;

        const cashRecordDetail = await this.repository.query(rawQuery, [cashRecordDetailId, cashRecordDetailId]);

        return cashRecordDetail;
    }
}
