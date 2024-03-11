import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { hashPassword } from '../utils/authUtils';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await hashPassword(this.password);
  }
}
