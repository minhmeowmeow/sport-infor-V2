// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { Tournament } from './tournament.entity';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Tournament> {
    return this.tournamentService.findOne(id);
  }

  @Get()
  findAll(): Promise<Tournament[]> {
    return this.tournamentService.findAll();
  }

  @Post()
  create(@Body() tournamentData: Tournament): Promise<Tournament> {
    return this.tournamentService.create(tournamentData);
  }

  @Put('/update')
  update(@Query('id') id: number, @Body() tournamentData: Tournament): Promise<Tournament> {
    return this.tournamentService.update(id, tournamentData);
  }

  @Delete('/delete')
  delete(@Query('id') id: number): Promise<void> {
    return this.tournamentService.delete(id);
  }
}