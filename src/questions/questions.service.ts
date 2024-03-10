import { Injectable } from '@nestjs/common';
import { QuestionsRepository } from '@src/questions/questions.repository';
import { AvailableQuestionsResponseDTO } from '@src/questions/dto/available-questions-response.dto';
import { CustomResponse } from '@src/common/interfaces/custom-response.interface';
import { CustomHttpStatusCodes } from '@src/common/exceptions/custom-http-status-codes.enum';
import { CustomHttpMessages } from '@src/common/exceptions/custom-http-messages';
import { SubmitQuestionRequestDTO } from '@src/questions/dto/submit-question-request.dto';
import { SubmitQuestionResponseDTO } from '@src/questions/dto/submit-question-response.dto';

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

    async submitQuestion(submitQuestionRequestDTO: SubmitQuestionRequestDTO): Promise<CustomResponse<SubmitQuestionResponseDTO>> {
        const question = await this.questionsRepository.findQuestionById(submitQuestionRequestDTO.questionId);
        let isCorrect = false;

        switch (question.type) {
            // 타입 1과 2는 입력값이 answer값과 일치하는지 확인
            case '1':
            case '2':
                isCorrect = submitQuestionRequestDTO.answer === question.answer;
                break;
            // 타입 3은 입력값이 question title 뒤에 "a"가 추가된 값과 같은지 확인
            case '3':
                isCorrect = submitQuestionRequestDTO.answer === question.title + 'a';
                break;
        }

        if (isCorrect) {
            // 정답 처리
            return {
                code: CustomHttpStatusCodes.OK,
                message: CustomHttpMessages[CustomHttpStatusCodes.OK],
                data: {
                    questionId: question.id,
                    title: question.title,
                    answer: question.answer,
                    point: question.point,
                    type: question.type,
                    mid: question.type,
                },
            };
        } else {
            // 오답 처리
            const errorMessageFunction = CustomHttpMessages[CustomHttpStatusCodes.ERROR] as (detail?: string) => string;
            const errorMessage = errorMessageFunction('INCORRECT_ANSWER');

            return {
                code: CustomHttpStatusCodes.ERROR,
                message: errorMessage,
                data: {
                    questionId: question.id,
                    providedAnswer: submitQuestionRequestDTO.answer, // 사용자가 제출했던 정답
                },
            };
        }
    }
}
