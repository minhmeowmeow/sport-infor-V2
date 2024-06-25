import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecommendScore } from './recommend.entity';

@Injectable()
export class RecommendService {
    constructor(
        @InjectRepository(RecommendScore)
        private readonly recommendRepository: Repository<RecommendScore>,
    ) {}

    
    async findAll(): Promise<RecommendScore[]> {
      return this.recommendRepository.find();
    }

    async findOne(id: number): Promise<RecommendScore> {
        const recommend = await this.recommendRepository.findOne({
          where: {
              id: id
          }
      });
        if (!recommend) {
            throw new NotFoundException(`recommend with ID ${id} not found`);
        }
        return recommend;
    }

    async create(recommendData: RecommendScore): Promise<RecommendScore> {
        await this.recommendRepository
        .createQueryBuilder()
        .insert()
        .into(RecommendScore)
        .values(recommendData)
        .returning("id")
        .execute()
        return ;
    }

    async update(id: number, recommendData: RecommendScore): Promise<RecommendScore> {
      const updatedData = await this.recommendRepository.createQueryBuilder("recommend")
      .update<RecommendScore>(RecommendScore, { ...recommendData })
      .where("recommend_score.id = :id", { id: id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
    return updatedData.raw[0];
    }

    async delete(id: number): Promise<void> {
        const result = await this.recommendRepository.createQueryBuilder()
        .delete()
        .from(RecommendScore)
        .where("id = :id", { id: id })
        .execute()
    }
}
