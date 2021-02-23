import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Products } from '../../products/entities/products.entity';
import { OrdersStatusEnum } from '../orders.enum';

@Entity('orders')
export class Orders {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    staffId: number;

    @Column({ default: 0 })
    customerId: number;

    @Column('simple-json', { nullable: true })
    products: Products[];

    @Column({ default: 0 })
    totalPrice: number;

    @Column({ default: OrdersStatusEnum.PROCESSING })
    status: OrdersStatusEnum;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: string;

}
