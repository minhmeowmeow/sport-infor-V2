import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './tournament.entity';

@Injectable()
export class TournamentService {
    constructor(
        @InjectRepository(Tournament)
        private readonly tournamentRepository: Repository<Tournament>,
    ) {}

    
    async findAll(): Promise<Tournament[]> {
      return this.tournamentRepository.find();
    }

    async findOne(id: number): Promise<Tournament> {
        const tournament = await this.tournamentRepository.findOne({
          where: {
              id: id
          }
      });
        if (!tournament) {
            throw new NotFoundException(`tournament with ID ${id} not found`);
        }
        return tournament;
    }

    async create(tournamentData: Tournament): Promise<Tournament> {
        await this.tournamentRepository
        .createQueryBuilder()
        .insert()
        .into(Tournament)
        .values(tournamentData)
        .returning("id")
        .execute()
        return ;
    }

    async update(id: number, tournamentData: Tournament): Promise<Tournament> {
      const updatedData = await this.tournamentRepository.createQueryBuilder()
      .update(Tournament)
      .set({ ...tournamentData })
      .where("tournament.id = :id", { id: id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
    return updatedData.raw[0];
    }

    async delete(id: number): Promise<void> {
        const result = await this.tournamentRepository.createQueryBuilder()
        .delete()
        .from(Tournament)
        .where("id = :id", { id: id })
        .execute()
    }
}
