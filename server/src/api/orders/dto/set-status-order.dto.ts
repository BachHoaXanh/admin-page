import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrdersStatusEnum } from '../orders.enum';

export class SetStatusOrderDto {

    @IsNotEmpty()
    @ApiProperty()
    @IsEnum(OrdersStatusEnum)
    status: OrdersStatusEnum;

}
