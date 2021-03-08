import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Products } from '../../products/entities/products.entity';
import { OrdersStatusEnum } from '../orders.enum';

export class UpdateOrderDto {

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    staffId: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    customerId: number;

    @IsArray()
    @IsOptional()
    @ApiPropertyOptional()
    products: Products[];

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    totalPrice: number;

    @IsOptional()
    @ApiPropertyOptional()
    @IsEnum(OrdersStatusEnum)
    status: OrdersStatusEnum;

}
