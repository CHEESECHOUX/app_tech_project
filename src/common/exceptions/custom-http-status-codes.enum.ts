export const enum CustomHttpStatusCodes {
    OK = 0,
    ERROR = 1,
    CREATED = 201, // 새로운 리소스 생성
    ACCEPTED = 202, // 요청은 접수 되었지만, 처리는 완료되지 않음
    NON_AUTHORITATIVE_INFORMATION = 203, // 요청이 성공적으로 수행 되었으나, 요청에 대한 검증이 되지 않음
    RESET_CONTENT = 205, // 서버가 요청을 성공적으로 처리 했지만, 콘텐츠를 표시하지 않음.
    PARTIAL_CONTENT = 206, // 서버가 GET 요청의 일부만 성공적으로 처리
    MOVED_PERMANENTLY = 301, // 요청한 리소스의 URI가 변경 되었음
    BAD_REQUEST = 400, // 서버가 요청을 이해할 수 없음
    UNAUTHORIZED = 401, // 인증되지 않은 사용자
    FORBIDDEN = 403, // 인증은 되었지만(사용자가 누구인지 확인함) 사용자가 접근할 권한을 갖고 있지 않음
    NOT_FOUND = 404, // 요청한 리소스가 존재하지 않음
    REQUEST_TIMEOUT = 408, // 요청에 응답하는 시간이 너무 오래 걸림
    TOO_MANY_REQUESTS = 429, // 클라이언트가 지정된 시간에 너무 많은 요청을 보냄
    INTERNAL_SERVER_ERROR = 500, // 서버 오류
    NOT_IMPLEMENTED = 501, // 클라이언트 요청에 대한 서버의 응답 수행 기능이 없음
    BAD_GATEWAY = 502, // 서버가 게이트웨이로부터 잘못된 응답을 수신했음
    SERVICE_UNAVAILABLE = 503, // 서버가 요청을 처리할 준비가 되지 않음. (유지보수를 위해 작동이 중단 or 과부하)
    GATEWAY_TIMEOUT = 504, // 서버가 게이트웨이 역할을 하고 있으며, 한 서버가 액세스 하고 있는 다른 서버에서 적시에 응답을 받지 못했음
}
