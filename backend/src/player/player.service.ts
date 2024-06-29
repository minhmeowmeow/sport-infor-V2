import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
    ) {}

    
    async findAll(): Promise<Player[]> {
      return this.playerRepository.find();
    }

    async findOne(id: number): Promise<Player> {
        const player = await this.playerRepository.findOne({
          where: {
              id: id
          }
      });
        if (!player) {
            throw new NotFoundException(`player with ID ${id} not found`);
        }
        return player;
    }

    async create(playerData: Player): Promise<Player> {
        await this.playerRepository
        .createQueryBuilder()
        .insert()
        .into(Player)
        .values(playerData)
        .returning("id")
        .execute()
        return ;
    }

    async update(id: number, playerData: Player): Promise<Player> {
      const updatedData = await this.playerRepository.createQueryBuilder()
      .update(Player)
      .set({...playerData})
      .where("player.id = :id", { id: id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
    return updatedData.raw[0];
    }

    async delete(id: number): Promise<void> {
        const result = await this.playerRepository.createQueryBuilder()
        .delete()
        .from(Player)
        .where("id = :id", { id: id })
        .execute()
    }
}
