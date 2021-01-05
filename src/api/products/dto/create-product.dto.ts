import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    categoryId: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsArray()
    @IsOptional()
    @ApiPropertyOptional()
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
