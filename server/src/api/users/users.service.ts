import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import * as bcrypt from 'bcryptjs';
import { Crud } from '@nestjsx/crud';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Crud({
    model: { type: User },
    dto: {
        create: CreateUserDto,
        update: UpdateUserDto,
    },
})
@Injectable()
export class UsersService extends TypeOrmCrudService<User> {

    constructor(@InjectRepository(User) users: Repository<User>) {
        super(users);
    }

    /**
     * Compare Password
     *
     * @param pass1: password get from client
     * @param pass2: hash password from DB
     * @return boolean
     */
    async comparePassword(pass1: string, pass2: string): Promise<boolean> {
        return bcrypt.compare(pass1, pass2);
    }

}
