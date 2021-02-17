import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokenService } from './token/token.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly auth: AuthService,
        private readonly token: TokenService,
    ) {}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req, @Body() body: LoginDto) {
        return this.auth.login(req, body);
    }

    @Post('logout')
    async logout(@Body() body: { token: string }) {
        await this.token.remove(body.token);
    }

}
