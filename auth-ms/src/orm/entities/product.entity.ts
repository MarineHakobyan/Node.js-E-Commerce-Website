import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, Index, OneToOne} from 'typeorm';
import { CategoryEnum } from "../../common/enums/productCategory.enum";
import { UserEntity } from "./user.entity";
import {CartEntity} from "./cart.entity";

@Entity('products')
@Index(['authorId'])
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    authorId: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({
        type: 'enum',
        enum: CategoryEnum,
        default: CategoryEnum.Electronics,
    })
    category: CategoryEnum;

    @Column({ nullable: true, type: 'varchar' })
    image: string | null;

    @Column({ nullable: true, type: 'varchar' })
    weight: string | null;

    @Column({ nullable: true, type: 'varchar' })
    dimensions: string | null;

    @Column({ nullable: true, type: 'varchar' })
    material: string | null;

    @OneToOne(() => CartEntity, (cart) => cart.product)
    cart: CartEntity | null;
}
