import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsOptional()
    @IsPhoneNumber('+84')
    phone: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    gender: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

}
