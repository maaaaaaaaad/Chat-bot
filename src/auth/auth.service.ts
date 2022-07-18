import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthInterface } from './interfaces/auth.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entities/users.entity';
import { Repository } from 'typeorm';
import { AuthLoginInputDto, AuthLoginOutputDto } from './dtos/auth.login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from './jwt/types/jwt.payload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements AuthInterface {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login({
    email,
    password,
  }: AuthLoginInputDto): Promise<AuthLoginOutputDto> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: { id: true, email: true, password: true },
    });
    if (!user) throw new NotFoundException('email');
    if (user.password !== password) throw new BadRequestException('password');
    const jwtPayload: JwtPayloadType = {
      id: user.id,
      email: user.email,
    };
    return {
      data: {
        id: user.id,
        email: user.email,
        access_token: this.jwtService.sign(jwtPayload, {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_KEY'),
          expiresIn: '30s',
        }),
        refresh_token: this.jwtService.sign(jwtPayload, {
          secret: this.configService.get<string>('JWT_REFRESH_TOKEN_KEY'),
          expiresIn: '60s',
        }),
      },
    };
  }
}
