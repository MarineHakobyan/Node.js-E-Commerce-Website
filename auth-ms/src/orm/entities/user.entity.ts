import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    username: string;

    @Column({ unique: true, type: 'varchar' })
    email: string;

    @Column({ type: 'varchar'})
    password: string;

    // @OneToMany(() => ProductEntity, (product) => product.user, { cascade: true }) // Optional: cascade deletion of products on user deletion
    // products: ProductEntity[];
}
