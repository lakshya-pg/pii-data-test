import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { Articles } from './article.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Articles)
    private readonly articleRepository: Repository<Articles>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async create(user: Users): Promise<Users> {
    return await this.userRepository.save(user);
  }

  async update(id: number, user: Users): Promise<Users[]> {
    console.log('updating...');
    await this.userRepository.update(id, user);
    return this.findAll();
  }

  async findAllArticles(): Promise<Articles[]> {
    return await this.articleRepository.find();
  }

  async createArticle(article: Articles): Promise<Articles> {
    return await this.articleRepository.save(article);
  }
}
