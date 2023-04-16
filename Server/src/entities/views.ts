import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Views {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  views?: number = 0;

  @Column({ length: 40 })
  videoId?: string;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateModified: Date;
}
