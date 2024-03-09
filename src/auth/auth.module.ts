import { Module } from '@nestjs/common';
import { AuthController } from '@src/auth/auth.controller';
import { AuthService } from '@src/auth/auth.service';
import { UsersRepository } from '@src/users/users.repository';

@Module({
    controllers: [AuthController],
    providers: [AuthService, UsersRepository],
})
export class AuthModule {}
