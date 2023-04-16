import { Entity,  Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ length: 40 })
  name?: string;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateModified: Date;
}
