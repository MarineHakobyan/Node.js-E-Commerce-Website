import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import {ProductEntity} from "./product.entity";
import {CartEntity} from "./cart.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    username: string;

    @Column({ unique: true, type: 'varchar' })
    email: string;

    @Column({ type: 'varchar'})
    password: string;

    @OneToMany(() => CartEntity, (cart) => cart.user, { cascade: true })
    @JoinTable({name: 'user-products'})
    cart: CartEntity[];
}
