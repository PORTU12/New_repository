import { ProduitEntity } from "src/entities/produit.entity";
import { UserRoleEnum } from "src/enum/user.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity {
    user(id: string, user: any): Promise<ProduitEntity> {
      throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn()
    id: number

    @Column({})
    public username: string

    @Column()
    public email: string

    @Column()
    public password: string

    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
    })
    role: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @OneToMany(
        type => ProduitEntity,
        (produit) => produit.user,
    )
    produit: ProduitEntity[];
}