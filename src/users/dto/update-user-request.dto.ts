import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequestDTO {
    @ApiProperty({ description: '이메일' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ description: '비밀번호' })
    @IsOptional()
    @IsString()
    password?: string;

    @ApiProperty({ description: '이름' })
    @IsOptional()
    @IsString()
    name?: string;
}
