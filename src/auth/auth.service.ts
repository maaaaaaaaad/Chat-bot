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

@Injectable()
export class AuthService implements AuthInterface {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
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
    return {
      data: {
        id: user.id,
        email: user.email,
        access_token: 'test1',
        refresh_token: 'test2',
      },
    };
  }
}
