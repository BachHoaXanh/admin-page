import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    categoryId: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    name: string;

    @IsArray()
    @IsOptional()
    @ApiPropertyOptional({ type: [String] })
    images: string[];

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

    @IsDate()
    @IsOptional()
    @ApiPropertyOptional()
    mfg: Date;

    @IsDate()
    @IsOptional()
    @ApiPropertyOptional()
    exp: Date;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    provider: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    origination: string;

}
