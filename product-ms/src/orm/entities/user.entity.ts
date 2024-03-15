import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import {Cart} from "./cart.entity";

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

    @OneToMany(() => Cart, (cart) => cart.user, { cascade: true })
    carts: Cart[];

    // #endregion
}
