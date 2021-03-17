import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ProductsStatusEnum } from '../products.enum';

@Entity('products')
export class Products {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    categoryId: string;

    @Column('text')
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

    @Column({ nullable: true })
    mfg: string;

    @Column({ nullable: true })
    exp: string;

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
