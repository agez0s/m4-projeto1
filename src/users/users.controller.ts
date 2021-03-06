import { UpdateUserDto } from './dto/update-user.dto';
import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('register')
  createUser(@Body() dados: CreateUserDto): Promise<User> {
    return this.service.create(dados);
  }

  @UseGuards(AuthGuard())
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
    return this.service.update(id, data);
  }

  @Get('find/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.service.findOne(id);
  }

  @Get('getall')
  findAll(): Promise<User[]> {
    return this.service.findMany();
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  deleteOne(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.deleteOne(id);
  }
}
