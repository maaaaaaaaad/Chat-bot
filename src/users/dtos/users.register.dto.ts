import { PickType } from '@nestjs/swagger';
import { UsersEntity } from '../entities/users.entity';
import { BaseOutputDto } from '../../common/dtos/base.output.dto';

export class UsersRegisterInputDto extends PickType(UsersEntity, [
  'email',
  'password',
]) {}

export class UserRegisterOutputDto extends BaseOutputDto<UsersEntity> {}
