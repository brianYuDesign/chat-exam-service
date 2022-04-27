import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity("chat")
export class ChatEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", nullable: true })
  lastMessage!: number;

  @ManyToMany(() => UserEntity, (user) => user.chatList)
  @JoinTable()
  userList?: UserEntity[];
}
