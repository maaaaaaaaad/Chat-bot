import { PickType } from '@nestjs/swagger';
import { UsersEntity } from '../entities/users.entity';
import { BaseOutputDto } from '../../common/dtos/base.output.dto';

export type UsersRegisterOutputDtoType = Pick<
  UsersEntity,
  'email' | 'createAt'
>;

export class UsersRegisterInputDto extends PickType(UsersEntity, [
  'email',
  'password',
]) {}

export class UserRegisterOutputDto extends BaseOutputDto<UsersRegisterOutputDtoType> {}
