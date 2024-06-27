// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RecordService } from './record.service';
import { Record } from './record.entity';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  findAll(): Promise<Record[]> {
    return this.recordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Record> {
    return this.recordService.findOne(id);
  }

  @Post()
  create(@Body() recordData: Record): Promise<Record> {
    return this.recordService.create(recordData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() recordData: Record): Promise<Record> {
    return this.recordService.update(id, recordData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.recordService.delete(id);
  }
}