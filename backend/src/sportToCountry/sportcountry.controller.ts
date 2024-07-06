// guests.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { SportToCountryService } from './sportcountry.service';
import { SportToCountry } from './sportcountry.entity';

@Controller('sportcountry')
export class SportToCountryController {
  constructor(private readonly sportToCountryService: SportToCountryService) {}

  @Get(':id')
  findOne(@Param('sport_id') sport_id: number, @Param('country_id') country_id: number): Promise<SportToCountry> {
    return this.sportToCountryService.findOne(sport_id, country_id);
  }

  @Get()
  findAll(): Promise<SportToCountry[]> {
    return this.sportToCountryService.findAll();
  }

  @Post()
  create(@Body() guestData: SportToCountry): Promise<SportToCountry> {
    return this.sportToCountryService.create(guestData);
  }

  @Put('/update')
  update(@Query('sport_id') sport_id: number, @Query('country_id') country_id: number
  , @Body() guestData: SportToCountry): Promise<SportToCountry> {
    return this.sportToCountryService.update(sport_id, country_id, guestData);
  }

  @Delete('/delete')
  delete(@Query('sport_id') sport_id: number, @Query('country_id') country_id: number): Promise<void> {
    return this.sportToCountryService.delete(sport_id, country_id);
  }
}