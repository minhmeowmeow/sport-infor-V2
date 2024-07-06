// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/search')
  findByName(@Query('search') search: string): Promise<User> {
    return this.userService.searchByName(search);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  
  @Post("/login")
  login(@Body() userData: User): Promise<User | null> {
    return this.userService.login(userData);
  }

  @Post("/newuser")
  createNewUser(@Body() userData: User): Promise<User> {
    return this.userService.create(userData);
  }

  @Post("/newadmin")
  createNewAdmin(@Body() requestBody: { userData: User, role: string }): Promise<User | null> {
    if(requestBody.role = "ROLE_ADMIN"){
      return this.userService.create(requestBody.userData);
    }
    return null;
  }

  @Put('/update')
  update(@Query('id') id: number, @Body() userData: User): Promise<User> {
    return this.userService.update(id, userData);
  }

  @Delete('/delete')
  delete(@Query('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}