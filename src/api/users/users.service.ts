import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {

    constructor(@InjectRepository(User) users: Repository<User>) {
        super(users);
    }

}
