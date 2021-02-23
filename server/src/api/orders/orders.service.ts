import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './entities/orders.entity';

export class OrdersService extends TypeOrmCrudService<Orders> {

    constructor(@InjectRepository(Orders) orders: Repository<Orders>) {
        super(orders);
    }

}
