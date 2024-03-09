import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { LocalSignupResponseDTO } from '@src/auth/dto/local-signup-response.dto';
import { LocalSignupRequestDTO } from '@src/auth/dto/local-signup-request.dto';

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

    async findOneByEmail(email: string): Promise<User> {
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
        return user;
    }
}
