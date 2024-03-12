import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {UserEntity} from "./userEntity";

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => UserEntity, user => user.products)
    user?: UserEntity;
}
