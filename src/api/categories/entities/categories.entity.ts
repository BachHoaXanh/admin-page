import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Entity('categories')
export class Categories {

    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @Column('varchar')
    name: string;

    @IsNumber()
    @IsOptional()
    @Column({ default: 0 })
    parent: number;

    @IsOptional()
    @Column('boolean', { default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: string;

}
