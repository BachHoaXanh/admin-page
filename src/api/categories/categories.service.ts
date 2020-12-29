import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './entities/categories.entity';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { CategoriesInterface } from './interfaces/categories.interface';
import { UpdateCategoriesDto } from './dto/update-categories.dto';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Categories)
        private categories: Repository<Categories>,
    ) {}

    /**
     * Get Category By Id
     *
     * @param id
     * @return CategoriesInterface
     */
    async getById(id: number): Promise<CategoriesInterface> {
        return this.categories.findOne({ id });
    }

    /**
     * Get All Categories
     *
     * @return CategoriesInterface[]
     */
    async list(): Promise<CategoriesInterface[]> {
        return this.categories.find();
    }

    /**
     * Create New Category
     *
     * @param body
     * @return CategoriesInterface
     */
    async create(body: CreateCategoriesDto): Promise<CategoriesInterface> {
        return this.categories.save(this.categories.create(body));
    }

    /**
     * Update Existed Category
     *
     * @param id
     * @param body
     * @return CategoriesInterface
     */
    async update(id: number, body: UpdateCategoriesDto): Promise<CategoriesInterface> {
        await this.categories.update({ id }, body);

        return this.getById(id);
    }

    /**
     * Deleted Existed Category
     *
     * @param id
     * @return boolean
     */
    async delete(id: number): Promise<{ deleted: boolean }> {
        const data = await this.categories.delete({ id });

        return { deleted: data.affected === 1 };
    }

}
