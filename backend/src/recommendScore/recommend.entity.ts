import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Guest} from 'src/guestbook/guest.entity';

@Entity({name: 'recommend_score'})
export class RecommendScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column({ length: 50 })
  description: string;

  @OneToMany(() => Guest, guest => guest.score)
  guests: Guest[];
}