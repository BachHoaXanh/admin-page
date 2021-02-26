import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Products } from '../../products/entities/products.entity';
import { OrdersStatusEnum } from '../orders.enum';

export class UpdateOrderDto {

    @IsNumber()
    @IsOptional()
    staffId: number;

    @IsNumber()
    @IsOptional()
    customerId: number;

    @IsArray()
    @IsOptional()
    products: Products[];

    @IsNumber()
    @IsOptional()
    totalPrice: number;

    @IsOptional()
    @IsEnum(OrdersStatusEnum)
    status: OrdersStatusEnum;

}
