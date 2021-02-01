import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Categories } from './entities/categories.entity';

@Injectable()
export class CategoriesService extends TypeOrmCrudService<Categories> {

    constructor(@InjectRepository(Categories) categories: Repository<Categories>) {
        super(categories);
    }

}
