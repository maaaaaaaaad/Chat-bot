import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entities/users.entity';
import JwtAccessTokenStrategy from './jwt/strategies/jwt.access.token.strategy';
import JwtRefreshTokenStrategy from './jwt/strategies/jwt.refresh.token.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
  ],
})
export class AuthModule {}
