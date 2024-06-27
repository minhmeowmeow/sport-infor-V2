// Guests.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GuestService } from './guest.service';
import { Guest } from './guest.entity';

@Controller('guests')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Get()
  findAll(): Promise<Guest[]> {
    return this.guestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Guest> {
    return this.guestService.findOne(id);
  }

  @Post("/new")
  createNewGuest(@Body() guestData: Guest): Promise<Guest> {
    return this.guestService.create(guestData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() guestData: Guest): Promise<Guest> {
    return this.guestService.update(id, guestData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.guestService.delete(id);
  }
}