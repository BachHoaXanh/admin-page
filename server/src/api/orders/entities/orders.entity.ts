import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Products } from '../../products/entities/products.entity';
import { OrdersPaymentEnum, OrdersStatusEnum } from '../orders.enum';

@Entity('orders')
export class Orders {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    staffId: number;

    @Column({ default: 0 })
    customerId: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column('text')
    address: string;

    @Column('text')
    note: string;

    @Column('text')
    shippingNote: string;

    @Column('simple-json', { nullable: true })
    products: Products[];

    @Column({ default: OrdersPaymentEnum.COD })
    payment: OrdersPaymentEnum;

    @Column('double', { default: 0 })
    totalPrice: number;

    @Column({ nullable: true, default: OrdersStatusEnum.PROCESSING })
    status: OrdersStatusEnum;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: string;

}
