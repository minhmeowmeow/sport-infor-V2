// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { SportService } from './sport.service';
import { Sport } from './sport.entity';

@Controller('sports')
export class SportController {
  constructor(private readonly sportService: SportService) {}

  @Get('/search')
  findByName(@Query('search') search: string): Promise<Sport[]> {
    return this.sportService.searchByName(search);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Sport> {
    return this.sportService.findOne(id);
  }

  @Get()
  findAll(): Promise<Sport[]> {
    return this.sportService.findAll();
  }

  @Post()
  create(@Body() sportData: Sport): Promise<Sport> {
    return this.sportService.create(sportData);
  }

  @Put("/update")
  update(@Query('id') id: number, @Body() sportData: Sport): Promise<Sport> {
    return this.sportService.update(id, sportData);
  }

  @Delete('/delete')
  delete(@Query('id') id: number): Promise<void> {
    return this.sportService.delete(id);
  }
}