import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CategoriesService } from './categories.service';
import { Categories } from './entities/categories.entity';

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
})
@Controller('api/categories')
export class CategoriesController implements CrudController<Categories> {

    constructor(public service: CategoriesService) {}

}
