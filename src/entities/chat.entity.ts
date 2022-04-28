import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";
import { ChatMessageEntity } from "./chat-message.entity";

@Entity("chat")
export class ChatEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => ChatMessageEntity)
  @JoinColumn()
  lastMessage!: ChatMessageEntity;

  @ManyToMany(() => UserEntity, (user) => user.chatList)
  @JoinTable()
  userList?: UserEntity[];
}
