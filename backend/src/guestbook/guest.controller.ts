// Guests.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { GuestService } from './guest.service';
import { Guest } from './guest.entity';

@Controller('guests')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Guest> {
    return this.guestService.findOne(id);
  }

  @Get()
  findAll(): Promise<Guest[]> {
    return this.guestService.findAll();
  }

  @Post("/new")
  createNewGuest(@Body() guestData: Guest): Promise<Guest> {
    return this.guestService.create(guestData);
  }

  @Put('/update')
  update(@Query('id') id: number, @Body() guestData: Guest): Promise<Guest> {
    return this.guestService.update(id, guestData);
  }

  @Delete('/delete')
  delete(@Query('id') id: number): Promise<void> {
    return this.guestService.delete(id);
  }
}