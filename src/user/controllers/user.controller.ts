import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { UserService } from './services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: any) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Get('search')
  async search(@Query('username') username: string, @Query('minAge') minAge: number, @Query('maxAge') maxAge: number) {
    return this.userService.searchUsers(username, minAge, maxAge);
  }
}
