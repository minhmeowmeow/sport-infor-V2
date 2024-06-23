import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { role } from './role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(role)
        private readonly roleRepository: Repository<role>,
    ) {}

    
    async findAll(): Promise<role[]> {
      return this.roleRepository.find();
    }

    async findOne(id: number): Promise<role> {
        const role = await this.roleRepository.findOne({
          where: {
              id: id
          }
      });
        if (!role) {
            throw new NotFoundException(`role with ID ${id} not found`);
        }
        return role;
    }

    async create(roleData: role): Promise<role> {
        // const newrole = this.roleRepository.create(roleData);
        // return this.roleRepository.save(newrole);
        await this.roleRepository
        .createQueryBuilder()
        .insert()
        .into(role)
        .values(roleData)
        .returning("id")
        .execute()
        return ;
    }

    async update(id: number, roleData: role): Promise<role> {
      // return this.roleRepository.save({
      //     id: id,
      //     rolename: roleData.rolename,
      //     password: roleData.password,
      //     email: roleData.email
      // });
      const updatedData = await this.roleRepository.createQueryBuilder("role")
      .update<role>(role, { ...roleData })
      .where("role.id = :id", { id: id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
    return updatedData.raw[0];
    }

    async delete(id: number): Promise<void> {
        const result = await this.roleRepository.createQueryBuilder()
        .delete()
        .from(role)
        .where("id = :id", { id: id })
        .execute()
    }
}
