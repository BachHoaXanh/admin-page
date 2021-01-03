import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ProductsService } from './products.service';
import { Products } from './entities/products.entity';

@Crud({
    model: {
        type: Products,
    },
    validation: {
        validationError: {
            target: false,
            value: false,
        },
    },
})
@Controller('api/products')
export class ProductsController {

    constructor(public service: ProductsService) {}

}
