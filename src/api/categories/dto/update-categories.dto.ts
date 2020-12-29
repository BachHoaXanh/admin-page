import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoriesDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    parent: number;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

}
