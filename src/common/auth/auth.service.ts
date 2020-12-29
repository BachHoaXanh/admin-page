import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../api/users/users.service';
import { TokenService } from './token/token.service';
import { LoginDto } from './dto/login.dto';
import { UsersInterfaces } from '../../api/users/interfaces/users.interfaces';

const signOptions = (expiresIn?: string) => ({
    subject: 'auth_token',
    audience: 'User',
    expiresIn: expiresIn || '30d',
    algorithm: 'RS256',
});

@Injectable()
export class AuthService {

    constructor(
      private readonly users: UsersService,
      private readonly tokens: TokenService,
    ) {}

    /**
     * Check User Valid
     *
     * @param username
     * @param password
     */
    async validate(username: string, password: string): Promise<any> {
        const data = await this.users.findByCondition({ username });

        if (!data || data.password !== password) {
            throw new UnauthorizedException('Invalid Username or Password');
        }

        return this.users.findById(data.id);
    }

    /**
     * Login
     *
     * @param req
     * @param body
     */
    async login(req, body: LoginDto): Promise<UsersInterfaces> {
        if (req.headers.authorization) {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
            const token = req.headers.authorization.split('Bearer ').join('');

            console.log(token);

            const payload = await this.tokens.verify(token, {
                subject: 'auth_token',
                audience: 'User',
                algorithm: ['RS256'],
            });

            console.log(payload);

            return this.users.findById(payload.ownerId);
        }
        console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');

        const { user } = req;
        const { token } = await this.tokens.create({
            ownerId: user.id,
            ...body,
        }, signOptions());

        return { id: 1, username: 'admin', password: 'aa', firstName: '', lastName: '', token };
    }

}