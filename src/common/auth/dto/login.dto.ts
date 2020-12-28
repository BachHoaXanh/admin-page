import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {

  @IsString()
  @MaxLength(16)
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}
