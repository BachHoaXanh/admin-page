import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesInterface } from './interfaces/categories.interface';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';

@Controller('api/categories')
export class CategoriesController {

    constructor(private readonly categories: CategoriesService) {}

    /**
     * New Categories
     *
     * @param body
     * @return CategoriesInterface
     */
    @Post()
    async create(@Body() body: CreateCategoriesDto): Promise<CategoriesInterface> {
        return this.categories.create(body);
    }

    /**
     * Get All Categories
     */
    @Get()
    async list(): Promise<CategoriesInterface[]> {
        return this.categories.list();
    }

    /**
     * Get Categories By Id
     *
     * @param id
     * @return CategoriesInterface
     */
    @Get()
    async get(@Param('id') id: number): Promise<CategoriesInterface> {
        return this.categories.getById(id);
    }

    /**
     * Update Category Info
     *
     * @param id
     * @param body
     * @return CategoriesInterface
     */
    @Put(':id')
    async update(@Param('id') id: number, body: UpdateCategoriesDto): Promise<CategoriesInterface> {
        return this.categories.update(id, body);
    }

    /**
     * Delete Category By Id
     *
     * @param id
     * @return boolean
     */
    @Delete(':id')
    remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
        return this.categories.delete(id);
    }

}
