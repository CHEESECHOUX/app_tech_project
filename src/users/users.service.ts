import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@src/users/users.repository';
import { UpdateUserRequestDTO } from './dto/update-user-request.dto';
import { CustomResponse } from '@src/common/interfaces/custom-response.interface';
import { CustomHttpStatusCodes } from '@src/common/exceptions/custom-http-status-codes.enum';
import { CustomHttpMessages } from '@src/common/exceptions/custom-http-messages';
import { UpdateUserResponseDTO } from '@src/users/dto/update-user-response.dto';
import { CustomDeleteResponse } from '@src/common/interfaces/custom-delete-response.interface';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async updateUser(id: number, updateUserRequestDTO: UpdateUserRequestDTO): Promise<CustomResponse<UpdateUserResponseDTO>> {
        try {
            const user = await this.usersRepository.findUserById(id);
            if (!user) {
                throw new Error('user를 찾을 수 없습니다');
            }

            const updatedUser = await this.usersRepository.update(id, updateUserRequestDTO);

            return {
                code: CustomHttpStatusCodes.OK,
                message: CustomHttpMessages[CustomHttpStatusCodes.OK],
                data: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    password: updatedUser.password,
                    name: updatedUser.name,
                },
            };
        } catch (error) {
            console.error('user 업데이트 에러: ', error);
            throw new Error('user 업데이트 에러: ' + error);
        }
    }

    async deleteUser(id: number): Promise<CustomDeleteResponse> {
        try {
            const deletedRowsCount = await this.usersRepository.deleteById(id);
            if (deletedRowsCount === 0) {
                throw new Error('user를 확인해 주세요');
            }

            return {
                code: CustomHttpStatusCodes.OK,
                message: CustomHttpMessages[CustomHttpStatusCodes.OK],
            };
        } catch (error) {
            console.error('feed 삭제 에러: ', error);
            throw new Error('feed 삭제 에러: ' + error.message);
        }
    }
}
