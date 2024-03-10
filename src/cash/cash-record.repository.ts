import { Injectable } from '@nestjs/common';
import { CashRecord } from '@src/cash/entity/cash-record.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CashRecordRepository {
    private repository: Repository<CashRecord>;

    constructor(private readonly dataSource: DataSource) {
        this.repository = dataSource.getRepository(CashRecord);
    }

    async create(userId: number, questionPoint: number): Promise<CashRecord> {
        const cashRecord = this.repository.create({
            userId,
            amount: questionPoint,
            status: 'add',
        });

        await this.repository.save(cashRecord);

        return cashRecord;
    }
}
