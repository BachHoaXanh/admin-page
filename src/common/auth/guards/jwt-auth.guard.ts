import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {

    async canActivate(context: ExecutionContext) {
        return (await super.canActivate(context)) as boolean;
    }

}
