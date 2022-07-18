import { PickType } from '@nestjs/swagger';
import { UsersEntity } from '../../users/entities/users.entity';
import { BaseOutputDto } from '../../common/dtos/base.output.dto';

export class AuthLoginInputDto extends PickType(UsersEntity, [
  'email',
  'password',
]) {}

export class AuthLoginOutputDto extends BaseOutputDto<
  Pick<UsersEntity, 'id' | 'email'> & {
    access_token: string;
    refresh_token: string;
  }
> {}
