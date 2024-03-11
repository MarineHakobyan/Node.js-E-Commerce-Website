import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    // ... other properties and methods
}