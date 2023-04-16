import { Entity,  Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Likes {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ length: 40 })
  userId?: string;

  @Column({ length: 40 })
  videoId?: string;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateModified: Date;
}
