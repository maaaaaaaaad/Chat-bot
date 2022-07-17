import {
  UsersRegisterInputDto,
  UsersRegisterOutputDtoType,
} from '../dtos/users.register.dto';

export interface UsersInterface {
  readonly register: (
    usersRegisterInputDto: UsersRegisterInputDto,
  ) => Promise<UsersRegisterOutputDtoType>;
}
