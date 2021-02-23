import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrdersStatusEnum } from '../orders.enum';

export class SetStatusOrderDto {

    @IsNotEmpty()
    @IsEnum(OrdersStatusEnum)
    status: OrdersStatusEnum;

}
