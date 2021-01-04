import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ProductsService } from './products.service';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
    dto: {
        create: CreateProductDto,
        update: UpdateProductDto,
    },
})
@Controller('api/products')
export class ProductsController {

    constructor(public service: ProductsService) {}

}
