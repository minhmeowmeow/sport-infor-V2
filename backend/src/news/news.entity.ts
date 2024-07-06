import { Sport } from 'src/sport/sport.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity({name: 'news'})
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 500 })
  description: string;

  @Column()
  created_date: Date

  @Column()
  updated_date: Date
  
  @ManyToOne(() => User, user => user.news)
  @JoinColumn({
  name: "user_id",
  referencedColumnName: 'id',
  foreignKeyConstraintName: 'news_user_id_fkey',
  }) 
  user_id: User;
  
  @ManyToOne(() => Sport, sport => sport.tournament)
  @JoinColumn({
  name: "sport_id",
  referencedColumnName: 'id',
  foreignKeyConstraintName: 'news_sports_id_fkey',
  }) 
  sport_id: Sport;

}