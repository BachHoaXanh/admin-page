import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCategoriesDto } from './create-categories.dto';

export class UpdateCategoriesDto extends PartialType(CreateCategoriesDto) {

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    slug: string;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    isActive: boolean;

}
