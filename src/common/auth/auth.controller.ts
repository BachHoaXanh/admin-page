import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly auth: AuthService,
    ) {}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req, @Body() body: LoginDto) {
        return this.auth.login(req, body);
    }

}
