import { Body, Controller, Param, Patch, UseInterceptors } from '@nestjs/common';
import { Crud, CrudRequest, CrudRequestInterceptor, ParsedRequest } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePassDto } from './dto/change-pass.dto';
import { editFileName, imageFileFilter } from '../../common/upload/file-upload.utils';

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
    routes: {
        exclude: ['createManyBase'],
    },
    dto: {
        create: CreateUserDto,
        update: UpdateUserDto,
        replace: UpdateUserDto,
    },
})
@ApiTags('Users')
@Controller('api/users')
export class UsersController {

    constructor(public service: UsersService) {}

    @Patch('change-password/:id')
    @UseInterceptors(CrudRequestInterceptor)
    async changePassword(@Param('id') id: number, @Body() body: ChangePassDto,
                         @ParsedRequest() req: CrudRequest) {
        return this.service.updateOne(req, { password: body.password });
    }

    @Patch('avatar/:id')
    @UseInterceptors(
        CrudRequestInterceptor,
        FileInterceptor('avatar', {
            storage: diskStorage({
                destination: './upload/users',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadAvatar(@Param('id') id: number, @ParsedRequest() req: CrudRequest) {

    }

}
