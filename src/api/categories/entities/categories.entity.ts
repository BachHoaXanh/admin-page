import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Categories {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

}
