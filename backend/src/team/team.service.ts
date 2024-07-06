import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
    ) {}

    
    async findAll(): Promise<Team[]> {
      return this.teamRepository.find();
    }

    async findOne(id: number): Promise<Team> {
        const team = await this.teamRepository.findOne({
          where: {
              id: id
          }
      });
        if (!team) {
            throw new NotFoundException(`team with ID ${id} not found`);
        }
        return team;
    }

    async create(teamData: Team): Promise<Team> {
        await this.teamRepository
        .createQueryBuilder()
        .insert()
        .into(Team)
        .values(teamData)
        .returning("id")
        .execute()
        return teamData;
    }

    async update(id: number, teamData: Team): Promise<Team> {
      const updatedData = await this.teamRepository.createQueryBuilder()
      .update(Team)
      .set({...teamData})
      .where("team.id = :id", { id: id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
    return updatedData.raw[0];
    }

    async delete(id: number): Promise<void> {
        const result = await this.teamRepository.createQueryBuilder()
        .delete()
        .from(Team)
        .where("id = :id", { id: id })
        .execute()
    }
}
