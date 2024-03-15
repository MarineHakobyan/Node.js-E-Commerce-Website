import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Cart} from "./cart.entity";
import {Product} from "./product.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    username: string;

    @Column({ unique: true, type: 'varchar' })
    email: string;

    @Column({ type: 'varchar'})
    password: string;

    // #region Relations

    @OneToMany(() => Cart, (cart) => cart.user)
    carts?: Cart[];

    @OneToMany(() => Product, (product) => product.user)
    products?: Product[];

    // #endregion
}
