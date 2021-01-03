import { IsNotEmpty, IsNumber } from 'class-validator';

export class TokenRequest {

  @IsNumber()
  @IsNotEmpty()
  readonly ownerId: string;

}
