import {
    BadRequestException,
    Body,
    Controller,
    Param,
    Patch, UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { Crud, CrudRequest, CrudRequestInterceptor, ParsedRequest } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePassDto } from './dto/change-pass.dto';
import { editFileName, imageFileFilter, removeFile } from '../../common/upload/file-upload.utils';
import { SetActivationDto } from './dto/set-activation.dto';
import { MailService } from '../../common/mailer/mail.service';

const getValue = (value) => value || '';

const contentChangePassword = (value) => `<b>Your account has successfully changed password</b> <br/><br/>
    New Password is <p style="color: green;">${value}</p>`;

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
    query: {
        sort: [{
            field: 'updatedAt',
            order: 'DESC',
        }],
    },
})
@ApiTags('Users')
@Controller('api/users')
export class UsersController {

    constructor(
      public service: UsersService,
      public mail: MailService,
    ) {}

    // TODO: create Role Management and replace role -> getRole()
    // const content = `
    //     <b>Your Account Information is changed Successfully.</b> <br/><br/>
    //     Email: ${getValue(updatedUser.email)} <br/>
    //     First Name: ${getValue(updatedUser.firstName)} <br/>
    //     Last Name: ${getValue(updatedUser.lastName)} <br/>
    //     Phone: ${getValue(updatedUser.phone)} <br/>
    //     Address: ${getValue(updatedUser.address)} <br/>
    //     Gender: ${getValue(updatedUser.gender)} <br/>
    //     Role: ${getValue(updatedUser.role)} <br/>`;
    //
    // this.mail.send(updatedUser.email, 'Change Account Information', content);

    @Patch('change-password/:id')
    @UseInterceptors(CrudRequestInterceptor)
    async changePassword(@Param('id') id: number, @Body() body: ChangePassDto,
                         @ParsedRequest() req: CrudRequest) {
        const user = await this.service.findOne({ id });

        if (!user || !await this.service.comparePassword(body.oldPassword, user.password)) {
            throw new BadRequestException('Old Password is not correct');
        }

        const updatedUser = await this.service.updateOne(req, { password: body.newPassword });

        this.mail.send(updatedUser.email, 'Change Account Password', contentChangePassword(body.newPassword));

        return updatedUser;
    }

    @Patch('reset-password/:id')
    @UseInterceptors(CrudRequestInterceptor)
    async resetPassword(@Param('id') id: number, @ParsedRequest() req: CrudRequest) {
        const newPassword = Math.floor(Math.random() * Math.floor(999999));
        const updatedUser = await this.service.updateOne(req, { password: newPassword.toString() });

        this.mail.send(updatedUser.email, 'Reset Account Password', contentChangePassword(newPassword));

        return { newPassword };
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
    async uploadAvatar(@Param('id') id: number, @UploadedFile() file, @ParsedRequest() req: CrudRequest) {
        const user = await this.service.findOne({ id });
        let newImage: object;

        if (file) {
            const oldImages = JSON.parse(JSON.stringify(user.avatar));

            // delete old avatar
            removeFile(oldImages.path.replace('/\\/g', '/'));

            newImage = {
                originalname: file.originalname,
                filename: file.filename,
                mimetype: file.mimetype,
                path: file.path,
            };
        }

        newImage = newImage !== undefined ? newImage : user.avatar;

        return this.service.updateOne(req, { avatar: newImage });
    }

    @Patch('set-activation/:id')
    @UseInterceptors(CrudRequestInterceptor)
    async setActivation(@Param('id') id: number, @Body() body: SetActivationDto,
                        @ParsedRequest() req: CrudRequest) {
        const updatedUser = await this.service.updateOne(req, { isActive: body.isActive });
        const content = `<b>Your Account has been ${body.isActive === true ? 'activated' : 'blocked'}.</b> <br/><br/>`;

        this.mail.send(updatedUser.email, 'Set Account Activation', content);

        return updatedUser;
    }

}
