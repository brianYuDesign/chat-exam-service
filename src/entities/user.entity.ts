import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ChatEntity } from "./chat.entity";

@Entity("user")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, name: "name" })
  name!: string;

  @ManyToMany(() => ChatEntity, (chat) => chat.userList)
  chatList?: ChatEntity[];
}
