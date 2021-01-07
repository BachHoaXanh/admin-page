import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePassDto {

  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string

}
