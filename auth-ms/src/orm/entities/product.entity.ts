import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CategoryEnum } from "../../common/enums/productCategory.enum";
import { UserEntity } from "./user.entity";

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

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

    // @ManyToOne(() => UserEntity, (user) => user.products)
    // user: UserEntity | null;
}
