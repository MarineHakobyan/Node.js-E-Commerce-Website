import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Index,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { CategoryEnum } from "../../common/enums/productCategory.enum";
import {Cart} from "./cart.entity";
import {User} from "./user.entity";

@Entity()
@Index(['ownerId'])
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    ownerId: number;

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


    // #region Relations

    @ManyToOne(() => User, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'user_id',
    })
    user?: User;

    @OneToOne(() => Cart, (cart) => cart.product)
    cart?: Cart;

    // #endregion
}
