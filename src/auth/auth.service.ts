import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException();

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException();

    return { accessToken: this.jwtService.sign({ userId: user.id }) };
  }
}
