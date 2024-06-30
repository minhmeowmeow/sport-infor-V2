// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './news.entity';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

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

  @Put(':id')
  update(@Param('id') id: number, @Body() newsData: News): Promise<News> {
    return this.newsService.update(id, newsData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.newsService.delete(id);
  }
}