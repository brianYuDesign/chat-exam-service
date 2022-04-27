import { Column, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

export class ChatUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", length: 100, nullable: true })
  chatId!: number;

  @Column({ type: "int", length: 100, nullable: true })
  userId!: number;
}
