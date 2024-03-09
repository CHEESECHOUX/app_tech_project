import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LocalLoginResponseDTO {
    @ApiProperty({ description: 'PK' })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ description: '이메일' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: '이름' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: '사용자의 캐시 잔액' })
    @IsNotEmpty()
    @IsString()
    cash: number;
}
