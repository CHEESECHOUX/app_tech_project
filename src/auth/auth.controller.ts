import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalSignupResponseDTO } from '@src/auth/dto/local-signup-response.dto';
import { LocalSignupRequestDTO } from '@src/auth/dto/local-signup-request.dto';
import { CustomResponse } from '@src/common/interfaces/custom-response.interface';
import { AuthService } from '@src/auth/auth.service';

@Controller('auth')
@ApiTags('사용자 인증 API')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

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
        description: '인증 실패 : 에러 발생 일시, 에러 메시지, statusCode를 반환',
    })
    @Post('register')
    async register(@Body() localSignupRequestDTO: LocalSignupRequestDTO): Promise<CustomResponse<LocalSignupResponseDTO>> {
        return await this.authService.register(localSignupRequestDTO);
    }
}
