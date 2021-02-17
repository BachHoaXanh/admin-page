import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { Categories } from './entities/categories.entity';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';

@Crud({
    model: {
        type: Categories,
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
        create: CreateCategoriesDto,
        update: UpdateCategoriesDto,
        replace: UpdateCategoriesDto,
    },
    query: {
        sort: [{
            field: 'updatedAt',
            order: 'DESC',
        }],
    },
})
@ApiTags('Categories')
@Controller('api/categories')
export class CategoriesController implements CrudController<Categories> {

    constructor(public service: CategoriesService) {}

}
