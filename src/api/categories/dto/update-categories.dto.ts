import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriesDto } from './create-categories.dto';

export class UpdateCategoriesDto extends PartialType(CreateCategoriesDto) {

    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    parent: number;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

}
