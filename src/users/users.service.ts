import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { DataSource, Repository } from 'typeorm';
import { UsersInterface } from './interfaces/users.interface';
import {
  UsersRegisterOutputDto,
  UsersRegisterInputDto,
} from './dtos/users.register.dto';

@Injectable()
export class UsersService implements UsersInterface {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async register({
    email,
    password,
  }: UsersRegisterInputDto): Promise<UsersRegisterOutputDto> {
    let user = await this.usersRepository.findOneBy({ email });
    if (user) throw new ConflictException('email');
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    user = this.usersRepository.create({ email, password });
    try {
      await this.dataSource.getRepository(UsersEntity).insert(user);
      await queryRunner.commitTransaction();
      return {
        data: {
          id: user.id,
          email: user.email,
          createAt: user.createAt,
        },
      };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(e);
    } finally {
      await queryRunner.release();
    }
  }
}
