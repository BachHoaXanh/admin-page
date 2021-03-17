import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductsStatusEnum } from '../products.enum';

export class CreateProductDto {

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    categoryId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    code: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    price: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    saleOff: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    quantity:number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    description: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    shortDescription: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    mfg: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    exp: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    provider: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    origination: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    @IsEnum(ProductsStatusEnum)
    status: ProductsStatusEnum;

}
