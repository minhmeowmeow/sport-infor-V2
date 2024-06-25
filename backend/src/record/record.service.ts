import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './record.entity';

@Injectable()
export class RecordService {
    constructor(
        @InjectRepository(Record)
        private readonly recordRepository: Repository<Record>,
    ) {}

    
    async findAll(): Promise<Record[]> {
      return this.recordRepository.find();
    }

    async findOne(id: number): Promise<Record> {
        const record = await this.recordRepository.findOne({
          where: {
              id: id
          }
      });
        if (!record) {
            throw new NotFoundException(`record with ID ${id} not found`);
        }
        return record;
    }

    async create(recordData: Record): Promise<Record> {
        await this.recordRepository
        .createQueryBuilder()
        .insert()
        .into(Record)
        .values(recordData)
        .returning("id")
        .execute()
        return ;
    }

    async update(id: number, recordData: Record): Promise<Record> {
      const updatedData = await this.recordRepository.createQueryBuilder("record")
      .update<Record>(Record, { ...recordData })
      .where("record.id = :id", { id: id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
    return updatedData.raw[0];
    }

    async delete(id: number): Promise<void> {
        const result = await this.recordRepository.createQueryBuilder()
        .delete()
        .from(Record)
        .where("id = :id", { id: id })
        .execute()
    }
}
