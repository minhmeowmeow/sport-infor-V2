import { Country } from 'src/country/country.entity';
import { Sport } from 'src/sport/sport.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity({name: 'sport_country'})
export class SportToCountry {

  @PrimaryColumn()
  country_id: number

  @PrimaryColumn()
  sport_id: number

  @ManyToOne(() => Country, country => country.sportToCountry)
  @JoinColumn({
    name: "country_id",
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'sport_country_country_id_fkey',
    }) 
  country: Country;

  @ManyToOne(() => Sport, sport => sport.sportToCountry)
  @JoinColumn({
    name: "sport_id",
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'sport_country_sport_id_fkey',
    }) 
  sport: Sport;

  @Column({ type: 'int' })
  year_join: number;

  @Column({ type: 'int' })
  total_score: number;

  @Column({ type: 'int' })
  international_trophy: number;
}