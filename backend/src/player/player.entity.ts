import { Team } from 'src/team/team.entity';
import { Sport } from 'src/sport/sport.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Record } from 'src/record/record.entity';

@Entity({name: 'player'})
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  age: number

  @Column({ length: 5000})
  description: string

  @Column({ length: 50 })
  role: string;
  
  @ManyToOne(() => Sport, sport => sport.player)
  @JoinColumn({
  name: "sport_id",
  referencedColumnName: 'id',
  foreignKeyConstraintName: 'player_sport_id_fkey',
  })
  sport_id: Sport;
  
  @ManyToOne(() => Team, team => team.player, {nullable: true})
  @JoinColumn({
  name: "team_id",
  referencedColumnName: 'id',
  foreignKeyConstraintName: 'player_team_id_fkey',
  })
  team_id: Sport;
  
  @OneToMany(() => Record, record => record.player_id)
  record: Record[];

}