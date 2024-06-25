import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity({name: 'sports'})
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 500 })
  strategy: string

  @Column({ length: 50 , name: "is_team"})
  is_team: string

  @Column({ length: 500 })
  rule: string

  @Column()
  time_invented: number
}