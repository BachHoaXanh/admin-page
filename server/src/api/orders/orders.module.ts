import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { Orders } from './entities/orders.entity';

@Module({
    imports: [ProductsModule, UsersModule, TypeOrmModule.forFeature([Orders])],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService],
})
export class OrdersModule {}
