import {
  UsersRegisterInputDto,
  UsersRegisterOutputDto,
} from '../dtos/users.register.dto';
import { UsersEntity } from '../entities/users.entity';

export interface UsersInterface {
  readonly register: (
    usersRegisterInputDto: UsersRegisterInputDto,
  ) => Promise<UsersRegisterOutputDto>;

  readonly findByPrimaryKey: (id: number) => Promise<UsersEntity | undefined>;
}
