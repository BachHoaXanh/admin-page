import { Products } from '../../products/entities/products.entity';
import { OrdersStatusEnum } from '../orders.enum';

export interface OrdersInterface {

    readonly id: number;

    readonly staffId: number;

    readonly customerId: number;

    readonly products: Products[];

    readonly totalPrice: number;

    readonly status: OrdersStatusEnum;

    readonly createdAt: string;

    readonly updatedAt: string;
}
