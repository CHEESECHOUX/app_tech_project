import { Injectable } from '@nestjs/common';
import { QuestionsRepository } from '@src/questions/questions.repository';
import { AvailableQuestionsResponseDTO } from '@src/questions/dto/available-questions-response.dto';
import { CustomResponse } from '@src/common/interfaces/custom-response.interface';
import { CustomHttpStatusCodes } from '@src/common/exceptions/custom-http-status-codes.enum';
import { CustomHttpMessages } from '@src/common/exceptions/custom-http-messages';
import { SubmitQuestionRequestDTO } from '@src/questions/dto/submit-question-request.dto';
import { SubmitQuestionResponseDTO } from '@src/questions/dto/submit-question-response.dto';
import { CashService } from '@src/cash/cash.service';
import { UsersRepository } from '@src/users/users.repository';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class QuestionsService {
    constructor(
        private readonly questionsRepository: QuestionsRepository,
        private readonly cashService: CashService,
        private readonly usersRepository: UsersRepository,
        private readonly dataSource: DataSource,
    ) {}

    async findAvailableQuestions(userId: number): Promise<CustomResponse<AvailableQuestionsResponseDTO | AvailableQuestionsResponseDTO[]>> {
        try {
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
        } catch (error) {
            console.error('findAvailableQuestions 에러: ', error);
            throw new Error('findAvailableQuestions 에러: ' + error);
        }
    }

    async submitQuestion(userId: number, submitQuestionRequestDTO: SubmitQuestionRequestDTO): Promise<CustomResponse<SubmitQuestionResponseDTO>> {
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

        const questionPoint = question.point;

        if (isCorrect) {
            // 정답 처리
            const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            try {
                // 질문 제출에 대한 캐시 보상(user 테이블에 cash 데이터 저장)
                await this.usersRepository.awardCashForUser(userId, questionPoint);

                // 캐시 지급 내역 저장(cash 서비스에서 cash_record, cash record_detail 테이블에 데이터 저장)
                await this.cashService.awardCashRecord(userId, questionPoint);

                await queryRunner.commitTransaction();

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
            } catch (error) {
                await queryRunner.rollbackTransaction();
                throw error;
            } finally {
                await queryRunner.release();
            }
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
