import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { OrmConfig } from './orm.config';
import { Articles } from './article.entity';
import { Comments } from './comments.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    TypeOrmModule.forFeature([Users, Articles, Comments]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
