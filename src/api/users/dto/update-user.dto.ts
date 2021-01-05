import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    lastName: string;

    @IsOptional()
    @IsPhoneNumber('+84')
    @ApiPropertyOptional()
    phone: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    address: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    gender: string;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    isActive: boolean;

}
