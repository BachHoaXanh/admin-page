import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePassDto {

  @IsString()
  @IsNotEmpty()
  password: string

}
