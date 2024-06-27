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
        const user = await this.guestRepository.findOne({
          where: {
              id: id
          }
      });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async create(userData: Guest): Promise<Guest> {
        
      const result = await this.guestRepository
      .createQueryBuilder()
      .insert()
      .into(Guest)
      .values(userData)
      .returning("id")
      .execute()
      const newlyInsertedUser = await this.guestRepository.findOne({
        where: {
            id: result.raw.insertid
        }
    });

      if (!newlyInsertedUser) {
        throw new Error('Failed to fetch newly created user');
      }

      return newlyInsertedUser;
    }

    async update(id: number, userData: Guest): Promise<Guest> {
      const updatedData = await this.guestRepository.createQueryBuilder("user")
      .update<Guest>(Guest, { ...userData })
      .where("user.id = :id", { id: id })
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
