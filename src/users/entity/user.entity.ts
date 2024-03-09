import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn({
        type: 'int',
        comment: 'PK',
    })
    id: number;

    @Column({
        type: 'int',
        comment: '사용자의 캐시 잔액',
        default: 0,
    })
    cash: number;

    @Column({
        type: 'varchar',
        comment: '이메일',
    })
    email: string;

    @Column({
        type: 'varchar',
        comment: '비밀번호',
    })
    password: string;

    @Column({
        type: 'varchar',
        comment: '이름',
    })
    name: string;

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

    @DeleteDateColumn({
        type: 'timestamp',
        comment: '삭제 날짜',
    })
    deletedAt: Boolean;
}
