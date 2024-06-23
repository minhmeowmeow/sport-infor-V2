import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    
    async findAll(): Promise<User[]> {
      return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
          where: {
              id: id
          }
      });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async create(userData: User): Promise<User> {
        // const newUser = this.userRepository.create(userData);
        // return this.userRepository.save(newUser);
        await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(userData)
        .returning("id")
        .execute()
        return ;
    }

    async update(id: number, userData: User): Promise<User> {
      // return this.userRepository.save({
      //     id: id,
      //     username: userData.username,
      //     password: userData.password,
      //     email: userData.email
      // });
      const updatedData = await this.userRepository.createQueryBuilder("user")
      .update<User>(User, { ...userData })
      .where("user.id = :id", { id: id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
    return updatedData.raw[0];
    }

    async delete(id: number): Promise<void> {
        const result = await this.userRepository.createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id: id })
        .execute()
    }
}
