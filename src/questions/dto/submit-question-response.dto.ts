import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SubmitQuestionResponseDTO {
    @ApiProperty({ description: 'PK' })
    @IsNotEmpty()
    @IsNumber()
    questionId: number;

    @ApiProperty({ description: '제목' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ description: '정답' })
    @IsOptional()
    @IsString()
    answer?: string;

    @ApiProperty({ description: '정답 시 획득 포인트' })
    @IsOptional()
    @IsNumber()
    point?: number;

    @ApiProperty({ description: '문제 타입(ex: 타입 1, 타입 2, 타입 3)' })
    @IsOptional()
    @IsString()
    type?: string;

    @ApiProperty({ description: '식별자(ex: 경제, 역사, 연예, 광고)' })
    @IsOptional()
    @IsString()
    mid?: string;

    @ApiProperty({ description: '식별자(ex: 경제, 역사, 연예, 광고)' })
    @IsOptional()
    @IsString()
    providedAnswer?: string;
}
