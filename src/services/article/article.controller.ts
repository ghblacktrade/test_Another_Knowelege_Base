import { ArticleService } from './article.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards
} from '@nestjs/common';
import { ArticleDto } from './dto/article.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getArticles(@Query('tags') tags?: string) {
    if (tags) {
      return this.articleService.getArticlesByTags(tags);
    }
    return this.articleService.getArticles();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getArticle(@Param('id') id: number) {
    return this.articleService.getArticleById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createArticle(@Body() articleDto: ArticleDto) {
    return this.articleService.createArticle(articleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateArticle(@Param('id') id: number, @Body() articleDto: ArticleDto) {
    return this.articleService.updateArticle(id, articleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteArticle(@Param('id') id: number) {
    return this.articleService.deleteArticle(id);
  }
}