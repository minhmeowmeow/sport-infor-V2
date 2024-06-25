// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Organization } from './organization.entity';

@Controller('Organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  findAll(): Promise<Organization[]> {
    return this.organizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Organization> {
    return this.organizationService.findOne(id);
  }

  @Post()
  create(@Body() organizationData: Organization): Promise<Organization> {
    return this.organizationService.create(organizationData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() organizationData: Organization): Promise<Organization> {
    return this.organizationService.update(id, organizationData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.organizationService.delete(id);
  }
}