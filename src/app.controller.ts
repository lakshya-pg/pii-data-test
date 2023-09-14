import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Users } from './user.entity';
import { Articles } from './article.entity';
import { Comments } from './comments.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(): Promise<Users[]> {
    return this.appService.findAll();
  }

  @Post()
  create(@Body() user: Users): Promise<Users> {
    return this.appService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: Users): Promise<Users[]> {
    return this.appService.update(+id, user);
  }

  @Get('/article')
  findAllArticles(): Promise<Articles[]> {
    return this.appService.findAllArticles();
  }

  @Post('/article')
  createArticle(@Body() article: Articles): Promise<Articles> {
    return this.appService.createArticle(article);
  }

  @Put('/article/:id')
  updateArticle(@Param('id') id: string, @Body() article: Articles) {
    return this.appService.updateArticle(+id, article);
  }

  @Get('/articles/users')
  getAllArticlesWithUser() {
    return this.appService.getAllArticlesWithUser();
  }

  @Post('/comments')
  saveComment(@Body() comment: Comments): Promise<Comments> {
    return this.appService.saveComment(comment);
  }

  @Get('/comments')
  getAllComments() {
    return this.appService.getAllComments();
  }
}
