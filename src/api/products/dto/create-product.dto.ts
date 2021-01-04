import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

    @IsNumber()
    @IsOptional()
    quantity:number;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    shortDescription: string;

    @IsDate()
    @IsOptional()
    mfg: Date;

    @IsDate()
    @IsOptional()
    exp: Date;

    @IsString()
    @IsOptional()
    provider: string;

    @IsString()
    @IsOptional()
    origination: string;

}
