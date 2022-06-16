import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }
  
  @Get()
  async getAll(): Promise<UserEntity[]> {
    return this.userService.findAll()
  }
  //le nombre de user par email
  @Get('stats')
  async statnumberbyemail(){
    return await this.userService.statusernumberbyemail()
  }
  @Get(':id')
  async getOne(@Param('id') id): Promise<UserEntity>{
    return this.userService.getById(id)
  }
  @Get('recover/:id')
  async restoreuser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.restoreuser(id);
  }
  
  @Put(':id')
  async UpdateUser(@Param('id') id: number, @Body() userdto: UserDto): Promise<UserEntity>{
    return this.userService.update(id, userdto)
  }
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number){
    return this.userService.softdelete(id)
  }
}
