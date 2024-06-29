import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';

@Injectable()
export class CountryService {
    constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
    ) {}

    
    async findAll(): Promise<Country[]> {
      return this.countryRepository.find();
    }

    async findOne(id: number): Promise<Country> {
        const country = await this.countryRepository.findOne({
          where: {
              id: id
          }
      });
        if (!country) {
            throw new NotFoundException(`country with ID ${id} not found`);
        }
        return country;
    }

    async create(countryData: Country): Promise<Country> {
        await this.countryRepository
        .createQueryBuilder()
        .insert()
        .into(Country)
        .values(countryData)
        .returning("id")
        .execute()
        return ;
    }

    async update(id: number, countryData: Country): Promise<Country> {
      const updatedData = await this.countryRepository.createQueryBuilder()
      .update(Country)
      .set({...countryData})
      .where("country.id = :id", { id: id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
    return updatedData.raw[0];
    }

    async delete(id: number): Promise<void> {
        const result = await this.countryRepository.createQueryBuilder()
        .delete()
        .from(Country)
        .where("id = :id", { id: id })
        .execute()
    }
}
