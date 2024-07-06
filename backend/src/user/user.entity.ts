import { News } from 'src/news/news.entity';
import { Role } from 'src/role/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 100 , unique: true})
  email: string;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({
    name: "role_id",
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'users_role_id_fkey',
    }) 
  role: Role;
  
  @OneToMany(() => News, news => news.user_id)
  news: News;
}