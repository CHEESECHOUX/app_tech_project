import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserResponseDTO {
    @ApiProperty({ description: 'PK' })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ description: '이메일' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: '비밀번호' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ description: '이름' })
    @IsNotEmpty()
    @IsString()
    name: string;
}
