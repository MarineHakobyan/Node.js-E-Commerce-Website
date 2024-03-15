import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, Index, JoinColumn} from 'typeorm';
import {User} from "./user.entity";
import {Product} from "./product.entity";


@Entity()
@Index(['userId'])
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    productId: number;

    @Column({ default: 1 })
    quantity: number;

    // #region Relations

    @ManyToOne(() => User, user => user.carts)
    user: User;

    @OneToOne(() => Product, (product) => product.cart)
    product:Product

    // #endregion
}
