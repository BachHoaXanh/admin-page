import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Products } from '../../products/entities/products.entity';
import { OrdersStatusEnum } from '../orders.enum';

export class CreateOrderDto {

    @IsNumber()
    @IsNotEmpty()
    staffId: number;

    @IsNumber()
    @IsNotEmpty()
    customerId: number;

    @IsArray()
    @IsNotEmpty()
    products: Products[];

    @IsNumber()
    @IsNotEmpty()
    totalPrice: number;

    @IsOptional()
    @IsEnum(OrdersStatusEnum)
    status: OrdersStatusEnum;

}
