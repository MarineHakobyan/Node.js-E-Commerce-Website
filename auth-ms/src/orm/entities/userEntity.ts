import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { hashPassword, comparePassword } from '../../utils/authUtils'; // Assuming authUtils for password hashing/comparison
import { ProductEntity } from './productEntity'; // Assuming productEntity.ts exists in the same directory

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    email: string;

    @Column()
    password: string; // Store hashed password

    @OneToMany(type => ProductEntity, product => product.user)
    products?: ProductEntity[] | null; // One-to-Many relationship with products

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        this.password = await hashPassword(this.password); // Hash password before saving
    }

    async validatePassword(candidatePassword: string): Promise<boolean> {
        return await comparePassword(candidatePassword, this.password); // Validate password during login etc.
    }
}