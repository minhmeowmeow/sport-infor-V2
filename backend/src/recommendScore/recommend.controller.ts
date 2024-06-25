// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { RecommendScore } from './recommend.entity';

@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Get()
  findAll(): Promise<RecommendScore[]> {
    return this.recommendService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<RecommendScore> {
    return this.recommendService.findOne(id);
  }

  @Post()
  create(@Body() recommendData: RecommendScore): Promise<RecommendScore> {
    return this.recommendService.create(recommendData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() recommendData: RecommendScore): Promise<RecommendScore> {
    return this.recommendService.update(id, recommendData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.recommendService.delete(id);
  }
}