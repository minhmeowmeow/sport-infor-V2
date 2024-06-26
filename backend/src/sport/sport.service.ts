import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Sport } from './sport.entity';

@Injectable()
export class SportService {
    constructor(
        @InjectRepository(Sport)
        private readonly sportRepository: Repository<Sport>,
    ) {}

    
    async findAll(): Promise<Sport[]> {
      return this.sportRepository.find();
    }

    async findOne(id: number): Promise<Sport> {
        const sport = await this.sportRepository.findOne({
          where: {
              id: id
          }, relations: ['player'] 
      });
        if (!sport) {
            throw new NotFoundException(`sport with ID ${id} not found`);
        }
        return sport;
    }

    async create(sportData: Sport): Promise<Sport> {
        // const newsport = this.sportRepository.create(sportData);
        // return this.sportRepository.save(newsport);
        await this.sportRepository
        .createQueryBuilder()
        .insert()
        .into(Sport)
        .values(sportData)
        .returning("id")
        .execute()
        return ;
    }

    async searchByName(Name: string): Promise<Sport[] | null> {
        const sport = await this.sportRepository.find({
          where: {
            name: ILike(`%${Name}%`)
          }
      });
        if (!sport) {
            return null;
            // throw new NotFoundException(`User was not found`);
        }
        return sport;
    }

    async update(id: number, sportData: Sport): Promise<Sport> {
      // return this.sportRepository.save({
      //     id: id,
      //     sportname: sportData.sportname,
      //     password: sportData.password,
      //     email: sportData.email
      // });
      const updatedData = await this.sportRepository.createQueryBuilder()
      .update(Sport)
      .set({...sportData})
      .where("sport.id = :id", { id: id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
    return updatedData.raw[0];
    }

    async delete(id: number): Promise<void> {
        const result = await this.sportRepository.createQueryBuilder()
        .delete()
        .from(Sport)
        .where("id = :id", { id: id })
        .execute()
    }
}
