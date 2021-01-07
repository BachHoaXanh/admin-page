import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePassDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string

}
