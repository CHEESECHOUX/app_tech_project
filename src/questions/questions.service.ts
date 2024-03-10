import { Injectable } from '@nestjs/common';
import { QuestionsRepository } from '@src/questions/questions.repository';
import { AvailableQuestionsResponseDTO } from '@src/questions/dto/available-questions-response.dto';
import { CustomResponse } from '@src/common/interfaces/custom-response.interface';
import { CustomHttpStatusCodes } from '@src/common/exceptions/custom-http-status-codes.enum';
import { CustomHttpMessages } from '@src/common/exceptions/custom-http-messages';

@Injectable()
export class QuestionsService {
    constructor(private readonly questionsRepository: QuestionsRepository) {}

    async findAvailableQuestions(userId: number): Promise<CustomResponse<AvailableQuestionsResponseDTO | AvailableQuestionsResponseDTO[]>> {
        const currentDate = new Date();
        const startOfDay = new Date(currentDate);
        startOfDay.setHours(0, 0, 0, 0);

        const questions = await this.questionsRepository.findAvailableQuestions(userId, startOfDay.toISOString());

        // 사용자에게 조건에 만족하는 question이 없는 경우 code 1 & message: '조회 가능한 데이터가 없습니다' return
        if (Array.isArray(questions) && questions.length === 0) {
            const errorMessageFunction = CustomHttpMessages[CustomHttpStatusCodes.ERROR] as (detail?: string) => string;
            const errorMessage = errorMessageFunction('NO_CONTENT');

            return {
                code: CustomHttpStatusCodes.ERROR,
                message: errorMessage,
                data: questions,
            };
        }

        return {
            code: CustomHttpStatusCodes.OK,
            message: CustomHttpMessages[CustomHttpStatusCodes.OK],
            data: questions,
        };
    }
}
