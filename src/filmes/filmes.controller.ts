import { UpdateFilmeDto } from './dto/update-filme.dto';
import { CreateFilmeDto } from './dto/create-filme.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { Filmes } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import AuthUser from 'src/auth/authuser';
import { User } from '@prisma/client';

@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}

  @UseGuards(AuthGuard())
  @Post('add')
  createFilme(@Body() dados: CreateFilmeDto): Promise<Filmes> {
    return this.filmesService.create(dados);
  }

  @UseGuards(AuthGuard())
  @Patch('edit/:id')
  updateFilme(
    @Param('id') id: string,
    @Body() dados: UpdateFilmeDto,
  ): Promise<Filmes> {
    return this.filmesService.update(id, dados);
  }

  @UseGuards(AuthGuard())
  @Get('find/:id')
  findOne(@Param('id') id: string): Promise<Filmes> {
    return this.filmesService.findOne(id);
  }

  @Get('getall')
  findAll(): Promise<Filmes[]> {
    return this.filmesService.findAll();
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.filmesService.deleteOne(id);
  }

  @UseGuards(AuthGuard())
  @Post('watch/:id')
  Assistir(
    @AuthUser() user: User,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return this.filmesService.assistir(user, id);
  }
}
