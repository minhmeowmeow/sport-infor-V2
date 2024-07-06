import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from './guest.entity';

@Injectable()
export class GuestService {
    constructor(
        @InjectRepository(Guest)
        private readonly guestRepository: Repository<Guest>,
    ) {}

    
    async findAll(): Promise<Guest[]> {
      return this.guestRepository.find();
    }

    async findOne(id: number): Promise<Guest> {
        const guest = await this.guestRepository.findOne({
          where: {
              id: id
          },relations: ['role']
      });
        if (!guest) {
            throw new NotFoundException(`guest with ID ${id} not found`);
        }
        return guest;
    }

    async create(guestData: Guest): Promise<Guest> {
        
      const result = await this.guestRepository
      .createQueryBuilder()
      .insert()
      .into(Guest)
      .values(guestData)
      .returning("id")
      .execute()
      const newlyInsertedguest = await this.guestRepository.findOne({
        where: {
            id: result.raw.insertid
        }
    });

      if (!newlyInsertedguest) {
        throw new Error('Failed to fetch newly created guest');
      }

      return newlyInsertedguest;
    }

    async update(id: number, guestData: Guest): Promise<Guest> {
      const updatedData = await this.guestRepository.createQueryBuilder()
      .update(Guest)
      .set({...guestData})
      .where("guest.id = :id", { id: id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
    return updatedData.raw[0];
    }

    async delete(id: number): Promise<void> {
        const result = await this.guestRepository.createQueryBuilder()
        .delete()
        .from(Guest)
        .where("id = :id", { id: id })
        .execute()
    }
}
