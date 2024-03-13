import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, type: 'varchar' })
    username: string;

    @Column({ unique: true, type: 'varchar' })
    email: string;

    @Column({ nullable: false, type: 'varchar' })
    password: string;

    // @OneToMany(() => ProductEntity, (product) => product.user, { cascade: true }) // Optional: cascade deletion of products on user deletion
    // products: ProductEntity[];
}
