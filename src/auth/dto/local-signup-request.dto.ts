import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LocalSignupRequestDTO {
    @ApiProperty({ description: '이메일' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: '비밀번호' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ description: '이름' })
    @IsOptional()
    @IsString()
    name?: string;
}
