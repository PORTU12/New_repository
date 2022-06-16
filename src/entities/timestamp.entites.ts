import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class Timestampentities{
    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}