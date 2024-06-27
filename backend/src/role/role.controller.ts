// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Post()
  create(@Body() userData: Role): Promise<Role> {
    return this.roleService.create(userData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() userData: Role): Promise<Role> {
    return this.roleService.update(id, userData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.roleService.delete(id);
  }
}