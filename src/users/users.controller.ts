import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UsersService } from '@src/users/users.service';
import { CustomResponse } from '@src/common/interfaces/custom-response.interface';
import { UpdateUserRequestDTO } from '@src/users/dto/update-user-request.dto';
import { UpdateUserResponseDTO } from './dto/update-user-response.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

/*
1. 회원정보 수정
2. 회원 탈퇴
*/
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /**
     * 회원정보 수정
     */
    @ApiOperation({
        summary: '회원정보 수정 api',
        description: `
            - 수정 입력 가능 값: email, password, name
            - cash 값은 마이페이지에서 수정 불가
        `,
    })
    @ApiBody({
        type: UpdateUserRequestDTO,
    })
    @ApiOkResponse({
        description: `
            - statusCode: 200
            - message: "성공"
            - data: { UpdateUserResponseDTO }
        `,
        type: UpdateUserResponseDTO,
    })
    @ApiUnauthorizedResponse({
        description: '인증 실패 : 에러 발생 일시, 에러 메시지, status code를 반환',
    })
    @Patch(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserRequestDto: UpdateUserRequestDTO,
    ): Promise<CustomResponse<UpdateUserResponseDTO>> {
        return this.usersService.updateUser(id, updateUserRequestDto);
    }
}
