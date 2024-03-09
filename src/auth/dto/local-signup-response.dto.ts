import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class LocalSignupResponseDTO {
    @ApiProperty({ description: 'PK' })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ description: '이메일' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: '이름' })
    @IsOptional()
    @IsString()
    name?: string;
}
