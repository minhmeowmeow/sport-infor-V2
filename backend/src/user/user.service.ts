import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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
          },relations:['role']
      });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async searchByName(Name: string): Promise<User | null> {
        const user = await this.userRepository.find({
          where: {
            email: ILike(`%${Name}%`)
          }
      });
        if (!user) {
            return null;
            // throw new NotFoundException(`User was not found`);
        }
        return user[0];
    }

    async login(userData: User): Promise<User | null> {
        const user = await this.userRepository.find({
          where: {
            email: userData.email,
            password: userData.password
          },
          relations: ['role']
      });
        if (!user) {
            return null;
            // throw new NotFoundException(`User was not found`);
        }
        return user[0];
    }

    async create(userData: User): Promise<User> {
        // const newUser = this.userRepository.create(userData);
        // return this.userRepository.save(newUser);
        
      const existUser = await this.login(userData);
      if(existUser){
        throw new Error('User already exists'); 
      }
      const result = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(userData)
      .returning("id")
      .execute()
      const newlyInsertedUser = await this.userRepository.findOne({
        where: {
            id: result.raw.insertid
        }
    });

      if (!newlyInsertedUser) {
        throw new Error('Failed to fetch newly created user');
      }

      return newlyInsertedUser;
    }

    async update(id: number, userData: User): Promise<User> {
      // return this.userRepository.save({
      //     id: id,
      //     username: userData.username,
      //     password: userData.password,
      //     email: userData.email
      // });
      const updatedData = await this.userRepository
    .createQueryBuilder()
    .update(User)
    .set({ ...userData })
    .where("id = :id", { id: id })
    .returning("*")
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
