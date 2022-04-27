import { Column, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

export class ChatEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", length: 100, nullable: true })
  lastMessage!: number;
}
