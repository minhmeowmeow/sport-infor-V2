// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from './team.entity';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Team> {
    return this.teamService.findOne(id);
  }

  @Post()
  create(@Body() teamData: Team): Promise<Team> {
    return this.teamService.create(teamData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() teamData: Team): Promise<Team> {
    return this.teamService.update(id, teamData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.teamService.delete(id);
  }
}