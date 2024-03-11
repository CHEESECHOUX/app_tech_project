import { Body, Controller, Delete, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UsersService } from '@src/users/users.service';
import { CustomResponse } from '@src/common/interfaces/custom-response.interface';
import { UpdateUserRequestDTO } from '@src/users/dto/update-user-request.dto';
import { UpdateUserResponseDTO } from '@src/users/dto/update-user-response.dto';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CustomDeleteResponse } from '@src/common/interfaces/custom-delete-response.interface';

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
            - code: 0
            - message: "성공"
            - data: { UpdateUserResponseDTO }
        `,
        type: UpdateUserResponseDTO,
    })
    @ApiBadRequestResponse({
        description: '실패 : 에러 발생 일시, 에러 메시지, code를 반환',
    })
    @Patch(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserRequestDto: UpdateUserRequestDTO,
    ): Promise<CustomResponse<UpdateUserResponseDTO>> {
        return this.usersService.updateUser(id, updateUserRequestDto);
    }

    /**
     * 회원 탈퇴
     */
    @ApiOperation({
        summary: '회원 탈퇴 api',
        description: `
                - param으로 전달받은 id에 해당하는 user를 소프트 삭제 처리
                - deleted_at 컬럼에 탈퇴 날짜 및 시간 저장
            `,
    })
    @ApiOkResponse({
        description: `
                - code: 0
                - message: "성공"
            `,
        type: UpdateUserResponseDTO,
    })
    @ApiBadRequestResponse({
        description: '실패 : 에러 발생 일시, 에러 메시지, code를 반환',
    })
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<CustomDeleteResponse> {
        return this.usersService.deleteUser(id);
    }
}
