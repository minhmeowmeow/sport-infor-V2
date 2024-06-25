// users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
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

  @Put(':id')
  update(@Param('id') id: number, @Body() userData: User): Promise<User> {
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}