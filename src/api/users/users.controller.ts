import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersInterfaces } from './interfaces/users.interfaces';

@Controller('api/users')
export class UsersController {

    constructor(private readonly users: UsersService) {}

    /**
     * New User
     *
     * @param body
     * @return UsersInterfaces
     */
    @Post()
    async create(@Body() body: CreateUserDto): Promise<UsersInterfaces> {
        return this.users.create(body);
    }

    /**
     * Find All Users
     */
    @Get()
    list(): Promise<UsersInterfaces[]> {
        return this.users.list();
    }

    /**
     * Get User by Id
     *
     * @param id
     * @return UsersInterfaces
     */
    @Get(':id')
    get(@Param('id') id: number): Promise<UsersInterfaces> {
        return this.users.getById(id);
    }

    /**
     * Update User Info
     *
     * @param id
     * @param body
     * @return UsersInterfaces
     */
    @Put(':id')
    update(@Param('id') id: number, @Body() body: UpdateUserDto): Promise<UsersInterfaces> {
        return this.users.update(id, body);
    }

    /**
     * Delete User By Id
     *
     * @param id
     * @return boolean
     */
    @Delete(':id')
    remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
        return this.users.delete(id);
    }

}
