import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Tags } from './tags';
import { Users } from './users';
import { VideoInfo } from './videoInfo';

@Entity()
export class Videos {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ length: 100 })
  title?: string;

  @Column('text')
  description?: string;

  @Column('text')
  thumbnail: string;

  @Column("text")
  tags: string;
  
  @OneToOne(() => VideoInfo)
  @JoinColumn()
  videoInfo: VideoInfo;

  @ManyToOne(() => Users, (user) => user.videos)
  user: Users;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateModified: Date;
}
