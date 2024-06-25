import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
    ) {}

    
    async findAll(): Promise<Organization[]> {
      return this.organizationRepository.find();
    }

    async findOne(id: number): Promise<Organization> {
        const organization = await this.organizationRepository.findOne({
          where: {
              id: id
          }
      });
        if (!organization) {
            throw new NotFoundException(`organization with ID ${id} not found`);
        }
        return organization;
    }

    async create(organizationData: Organization): Promise<Organization> {
        await this.organizationRepository
        .createQueryBuilder()
        .insert()
        .into(Organization)
        .values(organizationData)
        .returning("id")
        .execute()
        return ;
    }

    async update(id: number, organizationData: Organization): Promise<Organization> {
      const updatedData = await this.organizationRepository.createQueryBuilder("organization")
      .update<Organization>(Organization, { ...organizationData })
      .where("organization.id = :id", { id: id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
    return updatedData.raw[0];
    }

    async delete(id: number): Promise<void> {
        const result = await this.organizationRepository.createQueryBuilder()
        .delete()
        .from(Organization)
        .where("id = :id", { id: id })
        .execute()
    }
}
