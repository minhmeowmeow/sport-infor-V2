import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    
    async findAll(): Promise<Role[]> {
      return this.roleRepository.find();
    }

    async findOne(id: number): Promise<Role> {
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

    async create(roleData: Role): Promise<Role> {
        // const newrole = this.roleRepository.create(roleData);
        // return this.roleRepository.save(newrole);
        await this.roleRepository
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values(roleData)
        .returning("id")
        .execute()
        return ;
    }

    async update(id: number, roleData: Role): Promise<Role> {
      // return this.roleRepository.save({
      //     id: id,
      //     rolename: roleData.rolename,
      //     password: roleData.password,
      //     email: roleData.email
      // });
      const updatedData = await this.roleRepository.createQueryBuilder("role")
      .update<Role>(Role, { ...roleData })
      .where("role.id = :id", { id: id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
    return updatedData.raw[0];
    }

    async delete(id: number): Promise<void> {
        const result = await this.roleRepository.createQueryBuilder()
        .delete()
        .from(Role)
        .where("id = :id", { id: id })
        .execute()
    }
}
