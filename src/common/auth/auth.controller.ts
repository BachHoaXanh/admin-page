import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../../api/users/users.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly auth: AuthService,
        private readonly users: UsersService,
    ) {}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req, @Body() body: LoginDto) {
        return this.auth.login(req, body);
    }

}
