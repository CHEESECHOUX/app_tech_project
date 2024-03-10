import { Injectable } from '@nestjs/common';
import { convertToCamelCase } from '@src/common/utils/formatting.utils';
import { Question } from '@src/questions/entity/question.entity';
import { DataSource, Repository } from 'typeorm';
import { AvailableQuestionsResponseDTO } from '@src/questions/dto/available-questions-response.dto';

@Injectable()
export class QuestionsRepository {
    private repository: Repository<Question>;

    constructor(private readonly dataSource: DataSource) {
        this.repository = dataSource.getRepository(Question);
    }

    async findQuestionById(QuestionId: number): Promise<Question> {
        const question = await this.repository.createQueryBuilder('question').where('question.id = :id', { id: QuestionId }).getOne();
        return question;
    }

    async findAvailableQuestions(userId: number, startOfDay: string): Promise<AvailableQuestionsResponseDTO | AvailableQuestionsResponseDTO[]> {
        console.log('startOfDay 확인', startOfDay);

        // 타입 1: 사용자당 동일한 mid의 문제를 하루에 한 번
        // 타입 2: 사용자당 동일한 mid값의 문제를 3시간에 한 번
        // 타입 3: 사용자당 동일한 mid값의 문제를 기간에 관계 없이 한 번
        const rawQuery = `
        SELECT q.*, COUNT(qp.id) AS participationCount
        FROM question q
        LEFT JOIN question_participation qp
            ON qp.question_id = q.id AND qp.user_id = ? AND qp.mid = q.mid
        WHERE q.quantity > 0
            AND (
                (q.type = '3' AND NOT EXISTS (
                    SELECT 1 FROM question_participation qp3
                    WHERE qp3.user_id = ?
                        AND qp3.mid = q.mid 
                        AND qp3.type = '3'
                ))
                OR (q.type = '1' AND NOT EXISTS (
                    SELECT 1 FROM question_participation qp1
                    WHERE qp1.user_id = ? 
                        AND qp1.mid = q.mid
                        AND qp1.type = '1' 
                        AND qp1.participated_at > '${startOfDay}'
                ))
                OR (q.type = '2' AND NOT EXISTS (
                    SELECT 1 FROM question_participation qp2
                    WHERE qp2.user_id = ?
                        AND qp2.mid = q.mid
                        AND qp2.type = '2'
                        AND qp2.participated_at > DATE_SUB(NOW(), INTERVAL 3 HOUR)
                ))
            )
        GROUP BY q.id
        HAVING COUNT(qp.id) < q.quantity
        ORDER BY q.created_at DESC
        LIMIT 3;
        `;

        const questions = await this.repository.query(rawQuery, [userId, userId, userId, userId]);
        console.log('questions 확인', questions);

        if (questions) {
            const camelCaseQuestions = questions.map(question => convertToCamelCase(question));
            return camelCaseQuestions;
        } else {
            return questions;
        }
    }
}
