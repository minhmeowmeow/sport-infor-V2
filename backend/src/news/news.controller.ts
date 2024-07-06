// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './news.entity';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/latest')
  findLatest(): Promise<News[]> {
    return this.newsService.findLatest();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<News> {
    return this.newsService.findOne(id);
  }

  @Get()
  findAll(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Post()
  create(@Body() newsData: News): Promise<News> {
    return this.newsService.create(newsData);
  }

  @Put('/update')
  update(@Query('id') id: number, @Body() newsData: News): Promise<News> {
    return this.newsService.update(id, newsData);
  }

  @Delete('/delete')
  delete(@Query('id') id: number): Promise<void> {
    return this.newsService.delete(id);
  }
}