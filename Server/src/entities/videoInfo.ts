import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class VideoInfo {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  fieldname: string;

  @Column()
  originalname: string;

  @Column()
  encoding: string;

  @Column()
  mimetype: string;

  @Column()
  destination: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateModified: Date;
}
