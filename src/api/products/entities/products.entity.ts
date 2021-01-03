import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsOptional, IsString } from 'class-validator';
import { Categories } from '../../categories/entities/categories.entity';

@Entity('products')
export class Products {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @OneToOne(
        () => Categories,
        (category) => category.id,
        { cascade: true },
    )
    @JoinColumn()
    categoryId: number;

    @IsOptional()
    @Column('varchar')
    name: string;

    @IsString()
    @Column({ unique: true })
    code: string;

    @IsOptional()
    @Column('double', { default: 0 })
    price: number;

    @IsOptional()
    @Column('float', { default: 0 })
    saleOff: number;

    @IsOptional()
    @Column('text')
    description: string;

    @IsOptional()
    @Column('text')
    shortDescription: string;

    @IsOptional()
    @Column('date')
    mfg: Date;

    @IsOptional()
    @Column('date')
    exp: Date;

    @IsOptional()
    @Column('varchar')
    provider: string;

    @IsOptional()
    @Column('varchar')
    origination: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: string;

}
