import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany} from 'typeorm';
import { hashPassword, comparePassword } from '../../utils/authUtils';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => Product, product => product.user) // Define a one-to-many relationship with Product
    products?: Product[] | null;

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        this.password = await hashPassword(this.password);
    }

    async validatePassword(candidatePassword: string): Promise<boolean> {
        return await comparePassword(candidatePassword, this.password);
    }
}