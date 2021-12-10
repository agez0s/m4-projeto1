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

@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}

  @Post('add')
  createFilme(@Body() dados: CreateFilmeDto): Promise<Filmes> {
    return this.filmesService.create(dados);
  }

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

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.filmesService.deleteOne(id);
  }
}
