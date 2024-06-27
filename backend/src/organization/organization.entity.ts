import { Team } from 'src/team/team.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity({name: 'organization'})
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;
  
  @OneToMany(() => Team, team => team.organization_id)
  team: Team[];
}