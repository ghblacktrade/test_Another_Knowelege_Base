import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
  const jwtSecret = configService.get('JWT_SECRET');
  // console.log('JWT_SECRET:', jwtSecret);
  return {
    secret: jwtSecret,
  };
};