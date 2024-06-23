import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

}