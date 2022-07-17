import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UsersInterface } from './interfaces/users.interface';
import {
  UsersRegisterInputDto,
  UsersRegisterOutputDto,
} from './dtos/users.register.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersInterface,
  ) {}

  @Post()
  async register(
    @Body() usersRegisterInputDto: UsersRegisterInputDto,
  ): Promise<UsersRegisterOutputDto> {
    return this.userService.register(usersRegisterInputDto);
  }
}
