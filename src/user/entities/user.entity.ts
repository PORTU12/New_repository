import { ProduitEntity } from "src/produits/entities/produit.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {type} from 'os'

export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(
        (type)=>ProduitEntity,
        (produit) => produit.user,
    )
    produit: ProduitEntity;
}