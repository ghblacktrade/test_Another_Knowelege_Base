import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from '../../models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { compare, genSalt, hash, } from 'bcrypt';
import { ERROR_PASSWORD, USER_NOT_FOUND, } from './consts/consts';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
// не совсем относится к авторизации, но эта история нужна мне только для авторизации, так что оставил, лучше выносить в отдельный user.service
  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save()
  }

  async findUser(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }

    const isCorrectPassword = await compare(password, user.passwordHash)
    if (!isCorrectPassword) {
      throw new UnauthorizedException(ERROR_PASSWORD);
    }
    
    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    const token = await this.jwtService.signAsync(payload);
    // console.log('Token:', token);
    return {
      access_token: token
    };
  }
}