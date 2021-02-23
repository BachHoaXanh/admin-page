import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('information')
export class Information {

    @PrimaryGeneratedColumn()
    id: number;

}
