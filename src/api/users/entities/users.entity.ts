import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword(next) {
      // eslint-disable-next-line consistent-return
      bcrypt.genSalt(10, (err) => {
          if (err) return next(err);
          const salt = bcrypt.genSaltSync(10);

          // eslint-disable-next-line consistent-return
          bcrypt.hash(this.password, salt, ((error, res) => {
              if (error) return next(error);
              this.password = res;
          }));
      });
  }

  @Column()
  firstName: string;

  @Column()
  lastName: string;

}
