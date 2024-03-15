import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, Index} from 'typeorm';
import {Product} from "./product.entity";
import {User} from "./user.entity";


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

    // @ManyToOne(() => User, user => user.cart)
    // user: User;
    //
    // @OneToOne(() => Product, product => product.cart)
    // product: Product;

    // #endregion
}
