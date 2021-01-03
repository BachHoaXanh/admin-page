import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [CategoriesModule, ProductsModule, UsersModule],
})
export class ApiModule {}
