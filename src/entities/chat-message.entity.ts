import { PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./base.entity";

export class ChatMessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", length: 100, nullable: true })
  chatId!: number;

  @Column({ type: "int", length: 100, nullable: true })
  sender!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  content!: string;
}
