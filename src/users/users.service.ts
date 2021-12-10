import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User, Filmes } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async create(dados: CreateUserDto): Promise<User> {
    if (dados.passwordConfirm !== dados.password) {
      throw new UnauthorizedException('Confirmação de senha não confere.');
    }
    const userExists = await this.db.user.findUnique({
      where: { userName: dados.userName },
    });
    if (userExists) {
      throw new ConflictException('Nome de usuário já existe');
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(dados.password, salt);

    delete dados.passwordConfirm;

    const user = await this.db.user.create({
      data: {
        ...dados,
        password: hashedPassword,
      },
    });

    delete user.password;
    return user;
  }

  async update(id: string, dados: UpdateUserDto): Promise<User> {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(dados.password, salt);
    const user = await this.db.user.update({
      data: { ...dados, password: hashedPassword },
      where: { id: id },
    });

    delete user.password;

    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('ID não encontrado');
    }

    delete user.password;
    return user;
  }

  async findMany(): Promise<any[]> {
    const user = await this.db.user.findMany();
    const newUser = user.map(({ password, ...resto }) => resto);
    return newUser;
  }

  async deleteOne(id: string): Promise<{ message: string }> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        'Usuário com o ID informado não foi encontrado',
      );
    } else {
      await this.db.user.delete({
        where: { id },
      });
    }

    return {
      message: 'Usuário deletado com sucesso',
    };
  }
  async addList(user: User, filmeId: string) {
    const filme = await this.db.filmes.findUnique({
      where: { id: filmeId },
    });
    if (!filme) {
      throw new NotFoundException('ID de filme não encontrado!');
    }
    const userFilme = await this.db.user.update({
      where: { id: user.id },
      data: {
        filmes: {
          connect: {
            id: filme.id,
          },
        },
      },
      include: {
        filmes: true,
      },
    });
    delete userFilme.password;
    return userFilme;
  }
}
