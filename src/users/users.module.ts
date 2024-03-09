import { Module } from '@nestjs/common';
import { UsersController } from '@src/users/users.controller';
import { UsersService } from '@src/users/users.service';
import { UsersRepository } from '@src/users/users.repository';

@Module({
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
})
export class UsersModule {}
