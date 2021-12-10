import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CredentialsDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private database: PrismaService, private jwt: JwtService) {}

  async login(loginData: CredentialsDto) {
    const userExists = await this.database.user.findUnique({
      where: { userName: loginData.userName },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não existe');
    }

    const validatePass = await bcrypt.compare(
      loginData.password,
      userExists.password,
    );

    if (validatePass) {
      const payload = await { userName: userExists.userName };
      const token = await this.jwt.sign(payload);
      return { token };
    } else {
      throw new UnauthorizedException(`Credenciais inválidas`);
    }
  }
}
