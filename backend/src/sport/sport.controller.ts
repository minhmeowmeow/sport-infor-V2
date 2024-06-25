// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RoleService } from './sport.service';
import { Sport } from './sport.entity';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(): Promise<Sport[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Sport> {
    return this.roleService.findOne(id);
  }

  @Post()
  create(@Body() sportData: Sport): Promise<Sport> {
    return this.roleService.create(sportData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() sportData: Sport): Promise<Sport> {
    return this.roleService.update(id, sportData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.roleService.delete(id);
  }
}