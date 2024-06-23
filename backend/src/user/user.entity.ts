import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

//   @ManyToOne(() => Role, role => role.users)
//   role: Role;
}