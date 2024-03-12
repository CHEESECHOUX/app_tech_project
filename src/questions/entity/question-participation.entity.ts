import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QuestionParticipation {
    @PrimaryGeneratedColumn({
        type: 'int',
        comment: 'PK',
    })
    id: number;

    @Column({
        type: 'varchar',
        comment: '문제 타입(ex: 타입 1, 타입 2, 타입 3)',
    })
    type: string;

    @Column({
        type: 'varchar',
        comment: '식별자(ex: 경제, 역사, 연예, 광고)',
    })
    mid: string;

    @Column({
        type: 'timestamp',
        comment: '참여 날짜 및 시간',
    })
    participatedAt: Date;

    @Column({
        type: 'int',
        comment: '유저 PK',
    })
    userId: number;

    @Column({
        type: 'int',
        comment: '문제 PK',
    })
    questionId: number;
}
