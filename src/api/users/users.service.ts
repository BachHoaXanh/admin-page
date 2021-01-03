import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersInterfaces } from './interfaces/users.interfaces';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private users: Repository<User>,
    ) {}

    /**
     * Create New User
     *
     * @param body
     * @return UsersInterfaces
     */
    async create(body: CreateUserDto): Promise<UsersInterfaces> {
        return this.users.save(this.users.create(body));
    }

    /**
     * Get All Users
     *
     * @return UsersInterfaces[]
     */
    async list(): Promise<UsersInterfaces[]> {
        return this.users.find();
    }

    /**
     * Get User by userId
     *
     * @param id
     * @return UsersInterfaces
     */
    async getById(id: number): Promise<UsersInterfaces> {
        return this.users.findOne({ id });
    }

    /**
     * Get User by Other condition
     * Ex: { email }
     *
     * @param condition
     * @return UsersInterfaces
     */
    async getByCondition(condition: {}): Promise<UsersInterfaces> {
        return this.users.findOne(condition);
    }

    /**
     * Update Existed User
     *
     * @param id
     * @param body
     * @return UsersInterfaces
     */
    async update(id: number, body: UpdateUserDto): Promise<UsersInterfaces> {
        await this.users.update({ id }, body);

        return this.getById(id);
    }

    /**
     * Deleted Existed User
     *
     * @param id
     * @return boolean
     */
    async delete(id: number): Promise<{ deleted: boolean }> {
        const data = await this.users.delete({ id });

        return { deleted: data.affected === 1 };
    }

    /**
     * Lock account user
     *
     * @param id
     */
    async lock(id: number) {
        await this.users.update({ id }, { isActive: false });
    }

    /**
     * UnLock account user
     *
     * @param id
     */
    async unlock(id: number) {
        await this.users.update({ id }, { isActive: true });
    }

}
