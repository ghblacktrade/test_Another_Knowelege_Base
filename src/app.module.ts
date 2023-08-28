import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize';
import { AuthModule } from './services/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './services/article/article.module';
import { AuthService } from './services/auth/auth.service';
import { ArticleService } from './services/article/article.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot(sequelizeConfig),
    AuthModule,
    ArticleModule,
  ],
})
export class AppModule {}
