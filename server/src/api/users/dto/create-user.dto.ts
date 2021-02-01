import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
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

}
