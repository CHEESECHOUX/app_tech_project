import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AvailableQuestionsResponseDTO {
    @ApiProperty({ description: 'PK' })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ description: '제목' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: '정답' })
    @IsNotEmpty()
    @IsString()
    answer: string;

    @ApiProperty({ description: '가능한 수량' })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({ description: '정답 시 획득 포인트' })
    @IsNotEmpty()
    @IsNumber()
    point: number;

    @ApiProperty({ description: '문제 타입(ex: 타입 1, 타입 2, 타입 3)' })
    @IsNotEmpty()
    @IsString()
    type: string;

    @ApiProperty({ description: '식별자(ex: 경제, 역사, 연예, 광고)' })
    @IsNotEmpty()
    @IsString()
    mid: string;
}
