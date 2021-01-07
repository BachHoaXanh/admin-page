import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetActivationDto {

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    isActive: boolean

}
