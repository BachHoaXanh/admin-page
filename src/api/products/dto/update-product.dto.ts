import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @IsNumber()
    @IsOptional()
    categoryId: number;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    code: string;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsNumber()
    @IsOptional()
    saleOff: number;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    shortDescription: string;

}
