import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

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
        comment: '현금',
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
    createdTime: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        comment: '수정 날짜',
    })
    updatedTime: Date;

    @Column({
        type: 'boolean',
        comment: '삭제 여부',
        default: false,
    })
    isDeleted: Boolean;
}
