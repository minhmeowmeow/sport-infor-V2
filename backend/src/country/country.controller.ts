// guests.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from './country.entity';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Country> {
    return this.countryService.findOne(id);
  }

  @Get()
  findAll(): Promise<Country[]> {
    return this.countryService.findAll();
  }

  @Post()
  create(@Body() guestData: Country): Promise<Country> {
    return this.countryService.create(guestData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() guestData: Country): Promise<Country> {
    return this.countryService.update(id, guestData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.countryService.delete(id);
  }
}