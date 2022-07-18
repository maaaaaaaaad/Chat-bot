import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthInterface } from './interfaces/auth.interface';
import { AuthLoginInputDto, AuthLoginOutputDto } from './dtos/auth.login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthInterface,
  ) {}

  @Post()
  async login(
    @Body() authLoginInputDto: AuthLoginInputDto,
  ): Promise<AuthLoginOutputDto> {
    return this.authService.login(authLoginInputDto);
  }
}
