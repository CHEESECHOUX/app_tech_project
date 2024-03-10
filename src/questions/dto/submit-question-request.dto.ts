import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SubmitQuestionRequestDTO {
    @ApiProperty({ description: 'PK' })
    @IsNotEmpty()
    @IsNumber()
    questionId: number;

    @ApiProperty({ description: '정답' })
    @IsNotEmpty()
    @IsString()
    answer: string;
}
