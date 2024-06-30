import { Player } from 'src/player/player.entity';
import { Tournament } from 'src/tournament/tournament.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity({name: 'record'})
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  record_type: string;

  @Column()
  date_recorded: Date

  @Column()
  record_value: number
  
  @ManyToOne(() => Player, player => player.record)
  @JoinColumn({
  name: "player_id",
  referencedColumnName: 'id',
  foreignKeyConstraintName: 'record_player_id_fkey',
  }) 
  player_id: Player[];
  
  @ManyToOne(() => Tournament, tournament => tournament.record)
  @JoinColumn({
  name: "tournament_id",
  referencedColumnName: 'id',
  foreignKeyConstraintName: 'record_tournament_id_fkey',
  }) 
  tournament_id: Tournament[];

  
}