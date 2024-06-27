// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SportService } from './sport.service';
import { Sport } from './sport.entity';

@Controller('sports')
export class SportController {
  constructor(private readonly sportService: SportService) {}

  @Get()
  findAll(): Promise<Sport[]> {
    return this.sportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Sport> {
    return this.sportService.findOne(id);
  }

  @Post()
  create(@Body() sportData: Sport): Promise<Sport> {
    return this.sportService.create(sportData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() sportData: Sport): Promise<Sport> {
    return this.sportService.update(id, sportData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.sportService.delete(id);
  }
}