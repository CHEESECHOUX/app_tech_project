import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomDataResponse } from '@src/common/interfaces/custom-response.interface';
import { QuestionsService } from '@src/questions/questions.service';
import { AvailableQuestionsResponseDTO } from '@src/questions/dto/available-questions-response.dto';
import { SubmitQuestionRequestDTO } from '@src/questions/dto/submit-question-request.dto';
import { SubmitQuestionResponseDTO } from '@src/questions/dto/submit-question-response.dto';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

// 1. Question 목록 조회
// 2. Question의 정답 제출 시 유저에게 캐시 지급 & 유저의 캐시 지급 내역 저장

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    /**
     * Question 목록 조회 (해당 유저의 조건에 맞는 문제 3개 조회)
     */
    @ApiOperation({
        summary: 'Question 목록 조회 api',
        description: `
            param userId로 전달 받은 user의 조건에 맞는 문제 3개 조회

            * 문제 참여 기준
            - 타입 1: user당 동일한 mid의 문제를 하루에 한 번
            - 타입 2: user당 동일한 mid값의 문제를 3시간에 한 번
            - 타입 3: user당 동일한 mid값의 문제를 기간에 관계 없이 한 번

            * question 조건
            문제들은 동일한 mid값을 가질 수 있음
            question은 전체 user에 대해 매일 정해진 quantity까지만 참여 가능

            위의 조건을 만족하는 question중 3개를 반환
            위의 조건을 만족하는 question이 없으면 code 1 return
        `,
    })
    @ApiOkResponse({
        description: `
            - code: 0
            - message: "성공"
            - data: { AvailableQuestionsResponseDTO }
        `,
        type: AvailableQuestionsResponseDTO,
    })
    @ApiBadRequestResponse({
        description: '실패 : 에러 발생 일시, 에러 메시지, code를 반환',
    })
    @Get('/available/:userId')
    async findAvailableQuestions(
        @Param('userId') userId: number,
    ): Promise<CustomDataResponse<AvailableQuestionsResponseDTO | AvailableQuestionsResponseDTO[]>> {
        return this.questionsService.findAvailableQuestions(userId);
    }

    /**
     * Question의 정답 제출 시 유저에게 캐시 지급 & 유저의 캐시 지급 내역 저장
     */
    @ApiOperation({
        summary: 'Question의 정답 제출 시 유저에게 캐시 지급 & 유저의 캐시 지급 내역 저장 api',
        description: `
            유저가 제출한 정답이 questionId에 해당하는 answer과 같을 경우,
            questionId에 해당하는 point를 cash로 지급 및 유저에게 캐시 지급한 내역을 cash_record, cash_record_detail 테이블에 저장
            
            ** 정답 처리 유형
            - 타입 1 & 2: 입력 값이 answer과 일치하면 정답
            - 타입 3: 입력 값이 title 값 뒤에 + 'a'를 한 값과 같으면 정답

            획득 가능 포인트는 question별로 다름
        `,
    })
    @ApiBody({
        type: SubmitQuestionRequestDTO,
    })
    @ApiOkResponse({
        description: `
            - code: 0
            - message: "성공"
            - data: { SubmitQuestionResponseDTO }
        `,
        type: SubmitQuestionResponseDTO,
    })
    @ApiBadRequestResponse({
        description: '실패 : 에러 발생 일시, 에러 메시지, code를 반환',
    })
    @Post('/submit/:userId')
    async submitQuestion(
        @Param('userId') userId: number,
        @Body() submitQuestionRequestDTO: SubmitQuestionRequestDTO,
    ): Promise<CustomDataResponse<SubmitQuestionResponseDTO>> {
        const submitQuestion = await this.questionsService.submitQuestion(userId, submitQuestionRequestDTO);

        return submitQuestion;
    }
}
