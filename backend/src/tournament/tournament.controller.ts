// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { Tournament } from './tournament.entity';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Get()
  findAll(): Promise<Tournament[]> {
    return this.tournamentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Tournament> {
    return this.tournamentService.findOne(id);
  }

  @Post()
  create(@Body() tournamentData: Tournament): Promise<Tournament> {
    return this.tournamentService.create(tournamentData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() tournamentData: Tournament): Promise<Tournament> {
    return this.tournamentService.update(id, tournamentData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.tournamentService.delete(id);
  }
}