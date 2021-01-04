import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Crud({
    model: {
        type: User,
    },
    validation: {
        validationError: {
            target: false,
            value: false,
        },
    },
    dto: {
        create: CreateUserDto,
        update: UpdateUserDto,
    },
})
@Controller('api/users')
export class UsersController {

    constructor(public service: UsersService) {}

}
