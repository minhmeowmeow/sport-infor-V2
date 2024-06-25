import { News } from 'src/news/news.entity';
import { Player } from 'src/player/player.entity';
import { SportToCountry } from 'src/sportToCountry/sportcountry.entity';
import { Team } from 'src/team/team.entity';
import { Tournament } from 'src/tournament/tournament.entity';
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
  
  @OneToMany(() => SportToCountry, sportToCountry => sportToCountry.sport_id)
  sportToCountry: SportToCountry[];
  
  @OneToMany(() => Team, team => team.sport_id)
  team: Team[];
  
  @OneToMany(() => Player, player => player.sport_id)
  player: Player[];
  
  @OneToMany(() => Tournament, tournament => tournament.sport_id)
  tournament: Tournament[];
  
  @OneToMany(() => News, news => news.sport_id)
  news: News[];
}