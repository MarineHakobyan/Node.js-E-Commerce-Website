import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, Index} from 'typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

@Entity('cart')
@Index(['userId'])
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    productId: number;

    @Column({ default: 1 })
    quantity: number;

    @ManyToOne(() => UserEntity, user => user.cart)
    user: UserEntity;

    @OneToOne(() => ProductEntity, product => product.cart)
    product: ProductEntity;
}
