import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrdersPaymentEnum, OrdersStatusEnum } from '../orders.enum';
import { Products } from '../../products/entities/products.entity';

export class CreateOrderDto {

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    staffId: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    customerId: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    phone: number;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    address: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    note: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    shippingNote: string;

    @IsOptional()
    @IsEnum(OrdersPaymentEnum)
    payment: OrdersPaymentEnum;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    products: Products[];

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    totalPrice: number;

    @IsOptional()
    @IsEnum(OrdersStatusEnum)
    @ApiPropertyOptional()
    status: OrdersStatusEnum;

}
