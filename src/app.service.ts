import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository, DataSource } from 'typeorm';
import { Articles } from './article.entity';
import { Comments } from './comments.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Articles)
    private readonly articleRepository: Repository<Articles>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
    private dataSource: DataSource,
  ) {}

  async findAll() {
    // return await this.userRepository.find();

    return await this.dataSource
      .createQueryBuilder()
      .select('users')
      .from(Users, 'users')
      .where('users.name NOT IN (:...names)', {
        names: ['Lakshya'],
      })
      .getMany();
  }

  async create(user: Users): Promise<Users> {
    return await this.userRepository.save(user);
  }

  async update(id: number, user: Users): Promise<Users[]> {
    await this.userRepository.update(id, user);
    return this.findAll();
  }

  async findAllArticles(): Promise<Articles[]> {
    // return await this.articleRepository.find();
    return await this.dataSource.getRepository(Articles).find();
  }

  async createArticle(article: Articles): Promise<Articles> {
    return await this.articleRepository.save(article);
  }

  async updateArticle(id: number, article: Articles) {
    await this.dataSource
      .createQueryBuilder()
      .update(Articles)
      .set({
        title: article.title,
        description: article.description,
      })
      .where('id = :articleId', { articleId: id })
      .execute();
  }

  async getAllArticlesWithUser() {
    // const data = await this.dataSource
    //   .createQueryBuilder()
    //   .select(['users', 'articles'])
    //   .from(Articles, 'articles')
    //   .innerJoin(Users, 'users', 'users.id = articles.userId')
    //   .execute();

    // console.log(data);

    const data = await this.articleRepository
      .createQueryBuilder('articles')
      .select()
      .innerJoinAndSelect('articles.userId', 'users') // Assuming you have a relationship named "user" in Articles entity
      .getMany();

    console.log(data);
  }

  async getAllComments(): Promise<Comments[]> {
    return await this.dataSource.getRepository(Comments).find();
  }

  async saveComment(comment: Comments): Promise<Comments> {
    return await this.commentRepository.save(comment);
  }
}
