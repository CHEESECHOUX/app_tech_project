import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CashRecord {
    @PrimaryGeneratedColumn({
        type: 'int',
        comment: 'PK',
    })
    id: number;

    @Column({
        type: 'int',
        comment: '현금 적립 및 사용 수량',
    })
    amount: number;

    @Column({
        type: 'varchar',
        comment: '현금 상태 (ex: add | min | expired) ',
    })
    status: string;

    @Column({
        type: 'int',
        comment: '사용자 pk',
    })
    userId: number;

    @CreateDateColumn({
        type: 'timestamp',
        comment: '생성 날짜',
    })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        comment: '만료 날짜',
    })
    expiredAt: Date;
}
