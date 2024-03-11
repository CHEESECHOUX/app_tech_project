import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalSignupResponseDTO } from '@src/auth/dto/local-signup-response.dto';
import { LocalSignupRequestDTO } from '@src/auth/dto/local-signup-request.dto';
import { CustomResponse } from '@src/common/interfaces/custom-response.interface';
import { AuthService } from '@src/auth/auth.service';
import { LocalLoginRequestDTO } from '@src/auth/dto/local-login-request.dto';
import { LocalLoginResponseDTO } from '@src/auth/dto/local-login-response.dto';

/*
1. 회원가입(이메일, 비밀번호)
2. 로그인
*/
@Controller('auth')
@ApiTags('사용자 인증 API')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * 자체 로그인
     */
    @ApiOperation({
        summary: '자체(local) 로그인 인증 api',
        description: `
            1. 필수 입력 값
                - email, password
                - 사용자의 email, password가 Database에 저장된 값과 동일하면 인증 성공
            2. Redis에 세션 저장
                - 세션 유효 기간: 24시간
          `,
    })
    @ApiBody({
        type: LocalLoginRequestDTO,
    })
    @ApiOkResponse({
        description: `
            - code: 0
            - message: "성공"
            - data: { LocalLoginResponseDTO }
          `,
        type: LocalLoginResponseDTO,
    })
    @ApiBadRequestResponse({
        description: '실패 : 에러 발생 일시, 에러 메시지, code 반환',
    })
    @Post('login')
    async login(@Body() localLoginRequestDTO: LocalLoginRequestDTO): Promise<CustomResponse<LocalLoginResponseDTO>> {
        return await this.authService.localLogin(localLoginRequestDTO);
    }

    /**
     * 자체 회원가입
     */
    @ApiOperation({
        summary: '자체(local) 회원가입 api',
        description: `
        - 필수 입력 값: email, password
    `,
    })
    @ApiBody({
        type: LocalSignupRequestDTO,
    })
    @ApiCreatedResponse({
        description: `
        - code: 0
        - message: "새로운 리소스 생성 완료"
        - data: { LocalSignupResponseDTO }
    `,
        type: LocalSignupResponseDTO,
    })
    @ApiBadRequestResponse({
        description: '실패 : 에러 발생 일시, 에러 메시지, code 반환',
    })
    @Post('register')
    async register(@Body() localSignupRequestDTO: LocalSignupRequestDTO): Promise<CustomResponse<LocalSignupResponseDTO>> {
        return await this.authService.register(localSignupRequestDTO);
    }
}
