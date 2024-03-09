import { Module } from '@nestjs/common';
import { CashController } from '@src/cash/cash.controller';
import { CashService } from '@src/cash/cash.service';

@Module({
    controllers: [CashController],
    providers: [CashService],
})
export class CashModule {}
