import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadType } from '../types/jwt.payload';
import { UsersEntity } from '../../../users/entities/users.entity';
import { UsersInterface } from '../../../users/interfaces/users.interface';

@Injectable()
export default class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(
    private readonly configService: ConfigService,
    @Inject('USER_SERVICE') private readonly usersService: UsersInterface,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_KEY'),
    });
  }

  async validate(payload: JwtPayloadType): Promise<UsersEntity> {
    return await this.usersService.findByPrimaryKey(payload.id);
  }
}
