import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoriesDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsOptional()
    parent: number;

}
