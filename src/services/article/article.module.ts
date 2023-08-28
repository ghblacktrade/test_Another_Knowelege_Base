import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleModel } from '../../models/article.model';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';

@Module({
  providers: [ArticleService],
  controllers: [ArticleController],
  imports: [
    SequelizeModule.forFeature([ArticleModel]),
  ],
})
export class ArticleModule {}