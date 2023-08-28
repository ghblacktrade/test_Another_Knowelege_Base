import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './auth.service';
import { JwtModule, } from '@nestjs/jwt';
import { ConfigModule, ConfigService, } from '@nestjs/config';
import { getJWTConfig } from '../../config/jwt.config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModel } from '../../models/user.model';
import { PassportModule } from '@nestjs/passport';


@Module({
  controllers: [AuthController],
  imports: [
    SequelizeModule.forFeature([
      UserModel,
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy],
})

export class AuthModule {}