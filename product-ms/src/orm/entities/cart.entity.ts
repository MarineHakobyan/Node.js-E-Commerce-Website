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

    @ManyToOne(() => User, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'user_id',
    })
    user?: User;

    @OneToOne(
        () => Product,
        (product) => product.cart,
        {
            onDelete: 'CASCADE',
        },
    )
    @JoinColumn()
    product?: Product;

    // #endregion
}
