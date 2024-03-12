import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Question {
    @PrimaryGeneratedColumn({
        type: 'int',
        comment: 'PK',
    })
    id: number;

    @Column({
        type: 'varchar',
        comment: '제목',
    })
    title: string;

    @Column({
        type: 'varchar',
        comment: '정답',
    })
    answer: string;

    @Column({
        type: 'int',
        comment: '문제 참여 가능 수량', // 유저가 문제 참여 시 차감 & 매일 리셋
    })
    quantity: number;

    @Column({
        type: 'int',
        comment: '정답 시 획득할 수 있는 포인트',
    })
    point: number;

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

    @CreateDateColumn({
        type: 'timestamp',
        comment: '생성 날짜 및 시간',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        comment: '수정 날짜 및 시간',
    })
    updatedAt: Date;

    @Column({
        type: 'timestamp',
        comment: '삭제 날짜 및 시간',
    })
    deletedAt: Date;
}
