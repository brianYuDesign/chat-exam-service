import { Column, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({ type: "varchar", length: 100, name: "name" })
  name!: string;
}
