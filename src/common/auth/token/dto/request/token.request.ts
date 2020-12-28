import { IsNotEmpty, IsString } from 'class-validator';

export class TokenRequest {

  @IsString()
  @IsNotEmpty()
  readonly ownerId: string;

}
