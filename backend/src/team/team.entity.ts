import { Organization } from 'src/organization/organization.entity';
import { Player } from 'src/player/player.entity';
import { Sport } from 'src/sport/sport.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity({name: 'team'})
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  still_active: boolean

  @Column()
  year_form: number
  
  @ManyToOne(() => Sport, sport => sport.team)
  @JoinColumn({
  name: "sport_id",
  referencedColumnName: 'id',
  foreignKeyConstraintName: 'team_sport_id_fkey',
  }) 
  sport_id: Sport[];
  
  @ManyToOne(() => Organization, organization => organization.team)
  @JoinColumn({
  name: "organization_id",
  referencedColumnName: 'id',
  foreignKeyConstraintName: 'team_organization_id_fkey',
  }) 
  organization_id: Sport[];
  
  @OneToMany(() => Player, player => player.sport_id)
  player: Player[];

  
}