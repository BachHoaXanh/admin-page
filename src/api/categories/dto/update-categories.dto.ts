import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCategoriesDto } from './create-categories.dto';

export class UpdateCategoriesDto extends PartialType(CreateCategoriesDto) {

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    parent: number;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    isActive: boolean;

}
