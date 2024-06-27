import { RecommendScore } from 'src/recommendScore/recommend.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({name: 'guestbook'})
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  email: string;

  @Column()
  date_join: Date;

  @Column({ length: 500 })
  message: string;

  @ManyToOne(() => RecommendScore, score => score.guests)
  @JoinColumn({
    name: "recommend_id",
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'guestbook_recommend_id_fkey',
    }) 
  score: RecommendScore;

}