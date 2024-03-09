import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LocalSignupRequestDTO {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;
}
