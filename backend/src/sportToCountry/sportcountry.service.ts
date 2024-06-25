import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportToCountry } from './sportcountry.entity';
import { Sport } from 'src/sport/sport.entity';
import { Country } from 'src/country/country.entity';

@Injectable()
export class SportToCountryService {
    constructor(
        @InjectRepository(SportToCountry)
        private readonly sportcountryRepository: Repository<SportToCountry>,
        @InjectRepository(Sport)
        private readonly sportReporitory: Repository<Sport>,
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
    ) {}

    
    async findAll(): Promise<SportToCountry[]> {
      return this.sportcountryRepository.find();
    }

    async findOne(sport_id: number, country_id: number): Promise<SportToCountry> {
        const sportTocountry = await this.sportcountryRepository.findOne({
          where: {
            country_id: country_id,
            sport_id:sport_id
          },
      });
        if (!sportTocountry) {
            throw new NotFoundException(`could not find relation`);
        }
        return sportTocountry;
    }

    async create(Data: SportToCountry): Promise<SportToCountry> {
        await this.sportcountryRepository
        .createQueryBuilder()
        .insert()
        .into(SportToCountry)
        .values(Data)
        .returning("id")
        .execute()
        return ;
    }

    async update(sport_id: number, country_id: number, Data: SportToCountry): Promise<SportToCountry> {
      const updatedData = await this.sportcountryRepository.createQueryBuilder("sport_country")
      .update<SportToCountry>(SportToCountry, { ...Data })
      .where("country_id.id = :id", { id: country_id })
      .andWhere("sport_id.id = :id", { id: sport_id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
    return updatedData.raw[0];
    }

    async delete(sport_id: number, country_id: number): Promise<void> {
        const result = await this.sportcountryRepository.createQueryBuilder()
        .delete()
        .from(SportToCountry)
        .where("country_id.id = :id", { id: country_id })
        .andWhere("sport_id.id = :id", { id: sport_id })
        .execute()
    }
}
