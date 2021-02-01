import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('categories')
export class Categories {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { nullable: true })
    name: string;

    @Column({ default: 0 })
    parent: number;

    @Column('boolean', { default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: string;

}
