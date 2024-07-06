// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from './team.entity';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Team> {
    return this.teamService.findOne(id);
  }

  @Get()
  findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Post()
  create(@Body() teamData: Team): Promise<Team> {
    return this.teamService.create(teamData);
  }

  @Put('/update')
  update(@Query('id') id: number, @Body() teamData: Team): Promise<Team> {
    return this.teamService.update(id, teamData);
  }

  @Delete('/delete')
  delete(@Query('id') id: number): Promise<void> {
    return this.teamService.delete(id);
  }
}