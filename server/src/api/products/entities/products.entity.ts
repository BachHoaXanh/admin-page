import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ProductsStatusEnum } from '../products.enum';

@Entity('products')
export class Products {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    @JoinColumn()
    categoryId: string;

    @Column('varchar')
    name: string;

    @Column('simple-json', { nullable: true })
    images: string[];

    @Column({ unique: true, nullable: true })
    code: string;

    @Column('double', { default: 0 })
    price: number;

    @Column('float', { default: 0 })
    saleOff: number;

    @Column({ default: 0 })
    quantity: number;

    @Column('text', { nullable: true })
    description: string;

    @Column('text', { nullable: true })
    shortDescription: string;

    @Column('date', { nullable: true })
    mfg: Date;

    @Column('date', { nullable: true })
    exp: Date;

    @Column('varchar', { nullable: true })
    provider: string;

    @Column('varchar', { nullable: true })
    origination: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: string;

    @Column({ nullable: true })
    status: ProductsStatusEnum;

}
