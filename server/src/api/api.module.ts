import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { InformationModule } from './information/information.module';

@Module({
    imports: [CategoriesModule, ProductsModule, UsersModule, OrdersModule, InformationModule],
})
export class ApiModule {}
