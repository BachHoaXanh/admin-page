import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {

    @IsNumber()
    @IsOptional()
    categoryId: number;

    @IsString()
    @IsNotEmpty()
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
