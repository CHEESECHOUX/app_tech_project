import { Injectable } from '@nestjs/common';
import { User } from '@src/users/entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { LocalSignupResponseDTO } from '@src/auth/dto/local-signup-response.dto';
import { LocalSignupRequestDTO } from '@src/auth/dto/local-signup-request.dto';
import { convertToCamelCase } from '@src/common/utils/formatting.utils';
import { UpdateUserRequestDTO } from '@src/users/dto/update-user-request.dto';
import { UpdateUserResponseDTO } from '@src/users/dto/update-user-response.dto';

@Injectable()
export class UsersRepository {
    private repository: Repository<User>;

    constructor(private readonly dataSource: DataSource) {
        this.repository = dataSource.getRepository(User);
    }

    async register(enhancedDTO: LocalSignupRequestDTO): Promise<LocalSignupResponseDTO> {
        const { email, password, name } = enhancedDTO;

        const rawQuery = `
        INSERT INTO user(
            email,
            password,
            name
        ) VALUES (?, ?, ?)
    `;

        const registerUser = await this.repository.query(rawQuery, [email, password, name]);

        const id = registerUser.insertId;

        return { id, email, name };
    }

    async findUserByEmail(email: string): Promise<User> {
        const rawQuery = `
            SELECT
                u.id,
                u.email,
                u.password,
                u.name,
                u.cash,
                u.created_at
            FROM user AS u
            WHERE u.email = ?
            LIMIT 1
        `;

        const result = await this.repository.query(rawQuery, [email]);

        const user = result[0];

        if (user) {
            const camelCaseUser = convertToCamelCase(user);
            return camelCaseUser;
        } else {
            return user;
        }
    }

    async findUserById(id: number): Promise<User> {
        const user = await this.repository.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
        return user;
    }

    async update(id: number, updateUserRequestDTO: UpdateUserRequestDTO): Promise<UpdateUserResponseDTO> {
        const { email, password, name } = updateUserRequestDTO;

        let setClauses = [];
        let queryParams = [];

        if (email) {
            setClauses.push('email = ?');
            queryParams.push(email);
        }

        if (password) {
            setClauses.push('password = ?');
            queryParams.push(password);
        }

        if (name !== undefined) {
            setClauses.push('name = ?');
            queryParams.push(name);
        }

        if (setClauses.length === 0) {
            throw new Error('update할 field가 없습니다');
        }

        const rawQuery = `
            UPDATE user
            SET ${setClauses.join(', ')}
            WHERE id = ?
        `;
        queryParams.push(id);

        const result = await this.repository.query(rawQuery, queryParams);
        console.log(result);

        return { id, email, password, name };
    }

    async deleteById(id: number): Promise<number> {
        const rawQuery = `
            UPDATE user AS u
            SET deleted_at = NOW()
            WHERE u.id = ?
        `;

        const result = await this.repository.query(rawQuery, [id]);
        const deletedRowsCount = result.changedRows;

        return deletedRowsCount;
    }

    async awardCashForUser(userId: number, questionPoint: number): Promise<User> {
        const rawQuery = `
            UPDATE user AS u
            SET cash = u.cash + ?
            WHERE u.id = ?
        `;

        const result = await this.repository.query(rawQuery, [questionPoint, userId]);

        const user = result[0];

        if (user) {
            const camelCaseUser = convertToCamelCase(user);
            return camelCaseUser;
        } else {
            return user;
        }
    }
}
