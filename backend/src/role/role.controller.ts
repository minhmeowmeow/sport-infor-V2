// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { role } from './role.entity';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(): Promise<role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<role> {
    return this.roleService.findOne(id);
  }

  @Post()
  create(@Body() userData: role): Promise<role> {
    return this.roleService.create(userData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() userData: role): Promise<role> {
    return this.roleService.update(id, userData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.roleService.delete(id);
  }
}