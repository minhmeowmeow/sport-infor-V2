import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './news.entity';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>,
    ) {}

    
    async findLatest(): Promise<News[]> {
        return this.newsRepository.find({
            take: 3, 
            order: {
                id: 'DESC', 
            },
        });
      }
    
    async findAll(): Promise<News[]> {
      return this.newsRepository.find();
    }

    async findOne(id: number): Promise<News> {
        const news = await this.newsRepository.findOne({
          where: {
              id: id
          }, relations: ['user_id', 'sport_id'] 
      });
        if (!news) {
            throw new NotFoundException(`news with ID ${id} not found`);
        }
        return news;
    }

    async create(newsData: News): Promise<News> {
        await this.newsRepository
        .createQueryBuilder()
        .insert()
        .into(News)
        .values(newsData)
        .returning("id")
        .execute()
        return newsData;
    }

    async update(id: number, newsData: News): Promise<News> {
      const updatedData = await this.newsRepository.createQueryBuilder()
      .update(News)
      .set({...newsData})
      .where("news.id = :id", { id: id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
    return updatedData.raw[0];
    }

    async delete(id: number): Promise<void> {
        const result = await this.newsRepository.createQueryBuilder()
        .delete()
        .from(News)
        .where("id = :id", { id: id })
        .execute()
    }
}
