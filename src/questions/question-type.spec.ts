import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from '@src/questions/questions.service';
import { QuestionsRepository } from '@src/questions/questions.repository';
import { UsersRepository } from '@src/users/users.repository';
import { CashService } from '@src/cash/cash.service';
import { DataSource } from 'typeorm';
import { SubmitQuestionRequestDTO } from '@src/questions/dto/submit-question-request.dto';
import { CustomHttpStatusCodes } from '@src/common/exceptions/custom-http-status-codes.enum';

describe('QuestionsService', () => {
    let service: QuestionsService;
    let questionsRepository: jest.Mocked<QuestionsRepository>;
    let usersRepository: jest.Mocked<UsersRepository>;
    let cashService: jest.Mocked<CashService>;
    let dataSource: jest.Mocked<DataSource>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QuestionsService,
                {
                    provide: QuestionsRepository,
                    useValue: {
                        findQuestionById: jest.fn(),
                    },
                },
                {
                    provide: UsersRepository,
                    useValue: {
                        awardCashForUser: jest.fn(),
                    },
                },
                {
                    provide: CashService,
                    useValue: {
                        awardCashRecord: jest.fn(),
                    },
                },
                {
                    provide: DataSource,
                    useValue: {
                        createQueryRunner: jest.fn().mockReturnValue({
                            connect: jest.fn(),
                            startTransaction: jest.fn(),
                            commitTransaction: jest.fn(),
                            rollbackTransaction: jest.fn(),
                            release: jest.fn(),
                        }),
                    },
                },
            ],
        }).compile();

        service = module.get(QuestionsService);
        questionsRepository = module.get(QuestionsRepository);
        usersRepository = module.get(UsersRepository);
        cashService = module.get(CashService);
        dataSource = module.get(DataSource);
    });

    describe('submitQuestion', () => {
        const userId = 1;
        const baseQuestion = {
            id: 1,
            title: '문제',
            point: 10,
            type: '1',
            mid: '경제',
            quantity: 100,
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null,
        };

        // 정답일 경우, 타입별 테스트
        it.each([
            { type: '1', answer: '정답', title: '문제', correctAnswer: '정답' },
            { type: '2', answer: '정답', title: '문제', correctAnswer: '정답' },
            { type: '3', answer: '문제a', title: '문제', correctAnswer: '문제a' },
            // 새로운 type의 문제에 대한 정답 테스트 케이스 여기에 추가
        ])('정답을 제출했을 때 각 질문 유형별로 테스트 케이스', async ({ type, answer, title, correctAnswer }) => {
            const requestDTO = new SubmitQuestionRequestDTO();
            requestDTO.questionId = 1;
            requestDTO.answer = answer; // 테스트 시나리오에 따라 제출되는 정답

            questionsRepository.findQuestionById.mockResolvedValue({ ...baseQuestion, type, answer: correctAnswer, title });

            const response = await service.submitQuestion(userId, requestDTO);
            expect(response.code).toEqual(CustomHttpStatusCodes.OK);
            expect(response.data.point).toEqual(baseQuestion.point);
        });

        // 오답일 경우, 타입별 테스트
        it.each([
            { type: '1', answer: '오답', title: '문제', correctAnswer: '정답' },
            { type: '2', answer: '오답', title: '문제', correctAnswer: '정답' },
            { type: '3', answer: '오답', title: '문제', correctAnswer: '문제a' },
            // 새로운 type의 문제에 대한 오답 테스트 케이스 여기에 추가
        ])('오답을 제출했을 때 각 질문 유형별로 테스트 케이스', async ({ type, answer, title, correctAnswer }) => {
            const requestDTO = new SubmitQuestionRequestDTO();
            requestDTO.questionId = 1;
            requestDTO.answer = answer; // 테스트 시나리오에 따라 제출되는 오답

            questionsRepository.findQuestionById.mockResolvedValue({ ...baseQuestion, type, answer: correctAnswer, title });

            const response = await service.submitQuestion(userId, requestDTO);
            expect(response.code).toEqual(CustomHttpStatusCodes.ERROR);
            expect(response.message).toContain('오답입니다');
        });
    });
});
