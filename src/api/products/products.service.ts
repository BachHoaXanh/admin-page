import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Crud } from '@nestjsx/crud';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Crud({
    model: { type: Products },
    dto: {
        create: CreateProductDto,
        update: CreateProductDto,
    },
})
@Injectable()
export class ProductsService extends TypeOrmCrudService<Products> {

    constructor(@InjectRepository(Products) products: Repository<Products>) {
        super(products);
    }

}
