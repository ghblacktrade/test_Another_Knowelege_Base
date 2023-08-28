import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleDto } from './dto/article.dto';
import { Op } from 'sequelize';
import { ArticleModel } from '../../models/article.model';
import {
  InjectModel
} from '@nestjs/sequelize';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(ArticleModel) private readonly articleModel: typeof ArticleModel
  ) {}

  async getArticles() {
    return this.articleModel.findAll();
  }

  async getArticlesByTags(tags: string) {
    const tagsArray = tags.split(',');
    return this.articleModel.findAll({
      where: {
        tags: {
          [Op.overlap]: tagsArray,
        },
      },
    });
  }

  async getArticleById(id: number) {
    const article = await this.articleModel.findByPk(id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  async createArticle(articleDto: ArticleDto) {
    return this.articleModel.create(articleDto);
  }

  async updateArticle(id: number, articleDto: ArticleDto) {
    const article = await this.articleModel.findByPk(id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article.update(articleDto);
  }

  async deleteArticle(id: number) {
    const article = await this.articleModel.findByPk(id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    await article.destroy();
    return { message: 'Article deleted successfully' };
  }
}