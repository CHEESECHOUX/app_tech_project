import { Injectable } from '@nestjs/common';
import { CustomHttpException } from '@src/common/exceptions/custom-http-exception';
import { CustomHttpMessages } from '@src/common/exceptions/custom-http-messages';
import { CustomHttpStatusCodes } from '@src/common/exceptions/custom-http-status-codes.enum';
import { LocalSignupResponseDTO } from '@src/auth/dto/local-signup-response.dto';
import { CustomResponse } from '@src/common/interfaces/custom-response.interface';
import { LocalSignupRequestDTO } from '@src/auth/dto/local-signup-request.dto';
import { UsersRepository } from '@src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { LocalLoginRequestDTO } from '@src/auth/dto/local-login-request.dto';
import { LocalLoginResponseDTO } from '@src/auth/dto/local-login-response.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository) {}

    /**
     * 자체 회원가입
     */
    async register(localSignupRequestDTO: LocalSignupRequestDTO): Promise<CustomResponse<LocalSignupResponseDTO>> {
        try {
            const { password } = localSignupRequestDTO;

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const enhancedDTO = {
                ...localSignupRequestDTO,
                password: hashedPassword,
            };

            const registerUser = await this.usersRepository.register(enhancedDTO);

            if (!registerUser) {
                const errorMessage = CustomHttpMessages[CustomHttpStatusCodes.INTERNAL_SERVER_ERROR];
                throw new CustomHttpException(errorMessage, CustomHttpStatusCodes.INTERNAL_SERVER_ERROR);
            }

            return {
                code: CustomHttpStatusCodes.OK,
                message: CustomHttpMessages[CustomHttpStatusCodes.OK],
                data: {
                    id: registerUser.id,
                    email: registerUser.email,
                    name: registerUser.name,
                },
            };
        } catch (error) {
            console.error('local 회원가입 에러: ', error);
            throw new Error('local 회원가입 에러: ' + error);
        }
    }

    /**
     * 자체 로그인
     */
    async localLogin(localLoginRequestDTO: LocalLoginRequestDTO): Promise<CustomResponse<LocalLoginResponseDTO>> {
        const { email, password } = localLoginRequestDTO;
        // 이메일로 사용자 찾기
        const user = await this.usersRepository.findOneByEmail(email);

        if (!user) {
            const errorMessage = CustomHttpMessages[CustomHttpStatusCodes.BAD_REQUEST];
            throw new CustomHttpException(errorMessage, CustomHttpStatusCodes.BAD_REQUEST);
        }

        // 비밀번호 검증
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const errorMessage = CustomHttpMessages[CustomHttpStatusCodes.UNAUTHORIZED];
            throw new CustomHttpException(errorMessage, CustomHttpStatusCodes.UNAUTHORIZED);
        }

        // 비밀번호를 제외한 사용자 정보 반환
        const { password: _, ...result } = user;

        return {
            code: CustomHttpStatusCodes.OK,
            message: CustomHttpMessages[CustomHttpStatusCodes.OK],
            data: {
                id: result.id,
                email: result.email,
                name: result.name,
                cash: result.cash,
            },
        };
    }
}
