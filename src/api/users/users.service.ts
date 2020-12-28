import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersInterfaces } from './interfaces/users.interfaces';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private users: Repository<User>,
    ) {}

    /**
     * Create New User
     *
     * @param createUserDto
     * @return UsersInterfaces
     */
    async create(createUserDto: CreateUserDto): Promise<UsersInterfaces> {
        return this.users.save(this.users.create(createUserDto));
    }

    /**
     * Get All Users
     *
     * @return UsersInterfaces[]
     */
    async findAll(): Promise<UsersInterfaces[]> {
        return this.users.find();
    }

    /**
     * Get User by userId
     *
     * @param id
     * @return UsersInterfaces
     */
    async findById(id: number): Promise<UsersInterfaces> {
        return this.users.findOne({ id });
    }

    /**
     * Get User by Other condition
     * Ex: { username }
     *
     * @param condition
     * @return UsersInterfaces
     */
    async findByCondition(condition: any): Promise<UsersInterfaces> {
        return this.users.findOne(condition);
    }

    /**
     * Update Existed User
     *
     * @param id
     * @param updateUserDto
     * @return UsersInterfaces
     */
    async update(id: number, updateUserDto: UpdateUserDto): Promise<UsersInterfaces> {
        await this.users.update({ id }, updateUserDto);

        return this.users.findOne({ id });
    }

    /**
     * Deleted Existed User
     *
     * @param id
     * @return boolean
     */
    async remove(id: number): Promise<{ deleted: boolean }> {
        const data = await this.users.delete({ id });

        return { deleted: data.affected === 1 };
    }

}
