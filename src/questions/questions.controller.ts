import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomResponse } from '@src/common/interfaces/custom-response.interface';
import { QuestionsService } from '@src/questions/questions.service';
import { AvailableQuestionsResponseDTO } from '@src/questions/dto/available-questions-response.dto';
import { SubmitQuestionRequestDTO } from '@src/questions/dto/submit-question-request.dto';
import { SubmitQuestionResponseDTO } from '@src/questions/dto/submit-question-response.dto';

/* 1. Question 조회
    ** 문제 참여 기준
    - 타입 1: 사용자당 동일한 mid의 문제를 하루에 한 번
    - 타입 2: 사용자당 동일한 mid값의 문제를 3시간에 한 번
    - 타입 3: 사용자당 동일한 mid값의 문제를 기간에 관계 없이 한 번

    ** 정답 처리 유형
    - 타입 1 & 2: 입력 값이 answer과 일치하면 정답
    - 타입 3: 입력 값이 title 값 뒤에 + 'a'를 한 값과 같으면 정답

    ** question 조건
    문제들은 동일한 mid값을 가질 수 있음
    question은 전체 user에 대해 매일 정해진 quantity까지만 참여 가능


    위의 조건을 만족하는 question중 3개를 반환
    위의 조건을 만족하는 question이 없으면 code 1 return
    획득 가능 포인트는 question별로 다름
*/

// 2. QuestionId의 정답 제출 시 사용자에게 캐시 지급

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    /**
     * 사용자의 조건에 맞는 문제 3개 조회
     */
    @Get('/available/:userId')
    async findAvailableQuestions(
        @Param('userId') userId: number,
    ): Promise<CustomResponse<AvailableQuestionsResponseDTO | AvailableQuestionsResponseDTO[]>> {
        return this.questionsService.findAvailableQuestions(userId);
    }

    /**
     * QuestionId의 정답 제출 시 해당 유저에게 캐시 지급
     */
    @Post('/submit/:userId')
    async submitQuestion(
        @Param('userId') userId: number,
        @Body() submitQuestionRequestDTO: SubmitQuestionRequestDTO,
    ): Promise<CustomResponse<SubmitQuestionResponseDTO>> {
        const submitQuestion = await this.questionsService.submitQuestion(userId, submitQuestionRequestDTO);

        return submitQuestion;
    }
}
