import { CustomHttpStatusCodes } from './custom-http-status-codes.enum';

// CustomStatusMessages 객체가 CustomHttpStatusCodes 열거형의 각 값에 대해 문자열 또는 특정 함수를 속성 값으로 가질 수 있는 타입을 정의
export const CustomHttpMessages: { [key in CustomHttpStatusCodes]?: string | ((detail?: string) => string) } = {
    [CustomHttpStatusCodes.OK]: '성공',
    [CustomHttpStatusCodes.CREATED]: '새로운 리소스 생성 완료 ',
    [CustomHttpStatusCodes.ACCEPTED]: '요청은 접수 되었지만, 처리는 완료되지 않음',
    [CustomHttpStatusCodes.NON_AUTHORITATIVE_INFORMATION]: '요청이 성공적으로 수행 되었으나, 요청에 대한 검증이 되지 않음',
    [CustomHttpStatusCodes.BAD_REQUEST]: '서버가 요청을 이해할 수 없음',
    [CustomHttpStatusCodes.UNAUTHORIZED]: '인증되지 않은 사용자',
    [CustomHttpStatusCodes.FORBIDDEN]: (detail: string = 'DEFAULT') => {
        const details = {
            DEFAULT: '접근 금지',
            GUARD: '접근 권한이 없음',
        };
        return details[detail];
    },
    [CustomHttpStatusCodes.NOT_FOUND]: '요청한 리소스가 존재하지 않음',
    [CustomHttpStatusCodes.INTERNAL_SERVER_ERROR]: (detail: string = 'DEFAULT') => {
        const details = {
            DEFAULT: '내부 서버 오류 발생. 나중에 다시 시도하세요',
            DB: '데이터베이스 오류',
            TIMEOUT: '요청 시간 초과',
            UNKNOWN: '알 수 없는 내부 오류',
        };
        return details[detail];
    },
};
