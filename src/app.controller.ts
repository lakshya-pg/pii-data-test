import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Users } from './user.entity';
import { Articles } from './article.entity';

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
}
