import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tokens')
export class Token {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  token: string;

}
