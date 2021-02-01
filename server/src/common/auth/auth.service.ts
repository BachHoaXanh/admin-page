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
     * @param email
     * @param password
     */
    async validate(email: string, password: string): Promise<UsersInterfaces> {
        const data = await this.users.findOne({ email });

        if (!data || !await this.users.comparePassword(password, data.password)) {
            throw new UnauthorizedException('Invalid Email or Password');
        }

        return this.users.findOne({ id: data.id });
    }

    /**
     * Login
     *
     * @param req
     * @param body
     */
    async login(req, body: LoginDto): Promise<UsersInterfaces> {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split('Bearer ').join('');
            const payload = await this.tokens.verify(token, {
                subject: 'auth_token',
                audience: 'User',
                algorithm: ['RS256'],
            });

            return this.users.findOne({ id: payload.ownerId });
        }

        const { user } = req;
        const { token } = await this.tokens.create({
            ownerId: user.id,
            ...body,
        }, signOptions());

        return { ...user, token };
    }

}
