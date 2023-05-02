import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Users } from "./users";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column({ length: 40 })
  videoId?: string;

  @Column({ length: 500 })
  comment?: string;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateModified: Date;

  @ManyToOne(() => Users, (users) => users.comments)
  user: Users;
}
