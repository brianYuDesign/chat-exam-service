import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity("chat_message")
export class ChatMessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", nullable: true })
  chatId!: number;

  @Column({ type: "int", nullable: true })
  userId!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  content!: string;
}
