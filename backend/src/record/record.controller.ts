// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { RecordService } from './record.service';
import { Record } from './record.entity';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Record> {
    return this.recordService.findOne(id);
  }

  @Get()
  findAll(): Promise<Record[]> {
    return this.recordService.findAll();
  }

  @Post()
  create(@Body() recordData: Record): Promise<Record> {
    return this.recordService.create(recordData);
  }

  @Put('/update')
  update(@Query('id') id: number, @Body() recordData: Record): Promise<Record> {
    return this.recordService.update(id, recordData);
  }

  @Delete('/delete')
  delete(@Query('id') id: number): Promise<void> {
    return this.recordService.delete(id);
  }
}