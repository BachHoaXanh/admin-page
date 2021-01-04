import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
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
    dto: {
        create: CreateCategoriesDto,
        update: UpdateCategoriesDto,
    },
})
@Controller('api/categories')
export class CategoriesController implements CrudController<Categories> {

    constructor(public service: CategoriesService) {}

}
