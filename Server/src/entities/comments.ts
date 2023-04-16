import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ length: 40 })
  userId?: string;

  @Column({ length: 40 })
  videoId?: string;

  @Column({ length: 500 })
  comment?: string;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateModified: Date;
}
