import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categories {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  parent: number;

  @Column({ default: true })
  isActive: boolean;

}
