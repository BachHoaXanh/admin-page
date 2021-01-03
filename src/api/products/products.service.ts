import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Products } from './entities/products.entity';

@Injectable()
export class ProductsService extends TypeOrmCrudService<Products> {

    constructor(@InjectRepository(Products) products: Repository<Products>) {
        super(products);
    }

}
