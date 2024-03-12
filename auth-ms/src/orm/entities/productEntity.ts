import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {CategoryEnum} from "../../enums/productCategory.enum";
import {UserEntity} from "./userEntity";

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: CategoryEnum,
        default: CategoryEnum.Electronics,
    })
    category: CategoryEnum;

    @Column({ nullable: true })
    image?: string | null;

    @Column({ nullable: true })
    weight: string | null;

    @Column({ nullable: true })
    dimensions?: string | null;

    @Column({ nullable: true })
    material?: string | null;

@ManyToOne(type => UserEntity, user => user.products) // ManyToOne relationship with user
    user: UserEntity;
}
