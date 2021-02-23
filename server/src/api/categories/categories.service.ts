import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Crud } from '@nestjsx/crud';
import { Categories } from './entities/categories.entity';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';

@Crud({
    model: { type: Categories },
    dto: {
        create: CreateCategoriesDto,
        update: UpdateCategoriesDto,
    },
})
@Injectable()
export class CategoriesService extends TypeOrmCrudService<Categories> {

    constructor(@InjectRepository(Categories) categories: Repository<Categories>) {
        super(categories);
    }

}
