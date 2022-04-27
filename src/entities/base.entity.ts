import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
  @CreateDateColumn({ comment: "建立時間" })
  createdAt!: Date;

  @UpdateDateColumn({ comment: "更新時間" })
  updatedAt!: Date;
}
