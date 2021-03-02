import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RolesEnum } from '../roles.enum';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column('simple-json', { nullable: true })
    avatar: object;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    }

    @Column('text', { nullable: true })
    firstName: string;

    @Column('text', { nullable: true })
    lastName: string;

    @Column({ nullable: true })
    phone: string;

    @Column('text', { nullable: true })
    address: string;

    @Column({ default: 'unknown', nullable: true })
    gender: string;

    @Column({ nullable: true })
    role: RolesEnum;

    @Column('boolean', { default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: string;

}
