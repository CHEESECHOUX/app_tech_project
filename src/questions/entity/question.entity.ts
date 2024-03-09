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
        comment: '이메일',
    })
    title: string;

    @Column({
        type: 'varchar',
        comment: '이메일',
    })
    answer: string;

    @Column({
        type: 'varchar',
        comment: '이메일',
    })
    quantity: number;

    @Column({
        type: 'varchar',
        comment: '이메일',
    })
    type: string;

    @Column({
        type: 'varchar',
        comment: '이메일',
    })
    mid: string;

    @CreateDateColumn({
        type: 'timestamp',
        comment: '생성 날짜',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        comment: '수정 날짜',
    })
    updatedAt: Date;

    @Column({
        type: 'boolean',
        comment: '삭제 여부',
        default: false,
    })
    isDeleted: Boolean;
}
