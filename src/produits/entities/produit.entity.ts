import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProduitEntity {
@PrimaryGeneratedColumn()
id: number;

@Column()
prodname: string;

@Column()
price: number;

@ManyToOne(
    type => UserEntity,
    (user) => user.produit,
    {
        cascade: true,
        nullable: true
    }
)
user: UserEntity
}