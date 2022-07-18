import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadType } from '../types/jwt.payload';

@Injectable()
export default class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_KEY'),
    });
  }

  async validate(payload: JwtPayloadType) {}
}
