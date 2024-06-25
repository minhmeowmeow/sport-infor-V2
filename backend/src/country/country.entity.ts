import { SportToCountry } from 'src/sportToCountry/sportcountry.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity({name: 'country'})
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => SportToCountry, sportToCountry => sportToCountry.country_id)
  sportToCountry: SportToCountry[];

}