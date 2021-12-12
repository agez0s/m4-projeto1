import { UpdateFilmeDto } from './dto/update-filme.dto';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { PrismaService } from './../prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Filmes, User } from '@prisma/client';

@Injectable()
export class FilmesService {
  constructor(private db: PrismaService) {}

  async create(dados: CreateFilmeDto): Promise<Filmes> {
    const filmeExists = await this.db.filmes.findFirst({
      where: { name: dados.name, year: dados.year },
    });
    if (filmeExists) {
      throw new ConflictException(
        'Filme com o mesmo nome e mesmo ano já existe!',
      );
    }
    const filme = await this.db.filmes.create({
      data: dados,
    });
    return filme;
  }

  async update(id: string, dados: UpdateFilmeDto): Promise<Filmes> {
    const filme = await this.db.filmes.update({
      data: dados,
      where: { id: id },
    });
    return filme;
  }

  async findOne(id: string): Promise<Filmes> {
    const filme = await this.db.filmes.findUnique({
      where: { id },
    });
    if (!filme) {
      throw new NotFoundException('ID de filme não encontrado');
    }
    return filme;
  }

  async findAll(): Promise<Filmes[]> {
    return await this.db.filmes.findMany();
  }

  async deleteOne(id: string): Promise<{ message: string }> {
    const filme = await this.db.filmes.findUnique({
      where: { id },
    });
    if (!filme) {
      throw new NotFoundException('ID de filme não encontrado');
    }
    await this.db.filmes.delete({
      where: { id },
    });
    return {
      message: `Filme ${filme.name} (${filme.year}) apagado com sucesso.`,
    };
  }

  async assistir(user: User, id: string): Promise<{ message: string }> {
    const assistiu = await this.db.user.findUnique({
      where: { id: user.id },
      select: {
        filmes: {
          where: {
            id: id,
          },
        },
      },
    });

    if (!assistiu.filmes[0]) {
      //não assistiu. ve se o ID existe
      const filme = await this.db.filmes.findUnique({
        where: { id: id },
      });
      if (!filme) {
        throw new NotFoundException('ID de filme não encontrado!');
      }
      await this.db.user.update({
        where: { id: user.id },
        data: {
          filmes: {
            connect: {
              id: filme.id,
            },
          },
        },
      });

      return {
        message: `Marcou ${filme.name} (${filme.year}) como assistido em sua biblioteca.`,
      };
    } else {
      //não assistiu. ve se o ID existe
      const filme = await this.db.filmes.findUnique({
        where: { id: id },
      });
      if (!filme) {
        throw new NotFoundException('ID de filme não encontrado!');
      }
      await this.db.user.update({
        where: { id: user.id },
        data: {
          filmes: {
            disconnect: {
              id: filme.id,
            },
          },
        },
      });

      return {
        message: `Marcou ${filme.name} (${filme.year}) como NÃO assistido em sua biblioteca.`,
      };
    }
  }
}
