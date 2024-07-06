import { Record } from 'src/record/record.entity';
import { Sport } from 'src/sport/sport.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity({name: 'tournament'})
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  start_date: Date

  @Column()
  end_date: Date
  
  @ManyToOne(() => Sport, sport => sport.tournament)
  @JoinColumn({
  name: "sport_id",
  referencedColumnName: 'id',
  foreignKeyConstraintName: 'team_sport_id_fkey',
  }) 
  sport_id: Sport[];
  
  @OneToMany(() => Record, record => record.tournament_id)
  record: Record;

  
}