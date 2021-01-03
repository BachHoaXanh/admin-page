import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    }

    @Column({ default: '' })
    firstName: string;

    @Column({ default: '' })
    lastName: string;

    @Column({ default: '' })
    phone: string;

    @Column({ default: '' })
    address: string;

    @Column({ default: 'unknown' })
    gender: string;

    @Column('boolean', { default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: string;

}
