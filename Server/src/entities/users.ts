import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Videos } from "./videos";
import { Comments } from "./comments";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column({ length: 100 })
  userName: string;

  @Column({ length: 50 })
  password: string;

  @Column({ length: 100 })
  email: string;

  @Column({ type: "boolean" })
  isAdmin = false;

  @OneToMany(() => Videos, (videos) => videos.user)
  videos: Videos[];

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateModified: Date;

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];
}
