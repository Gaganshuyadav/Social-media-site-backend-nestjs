import { forwardRef, Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { UserModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { TweetEntity } from './tweet.entity';
import { HashtagEntity } from 'src/hashtag/hashtag.entity';
import { HashtagModule } from 'src/hashtag/hashtag.module';
import { PaginationModule } from 'src/common-for-all/pagination/pagination.module';

@Module({
  imports:[ 
    forwardRef(()=>UserModule),
    forwardRef(()=>HashtagModule),
    TypeOrmModule.forFeature([UserEntity, TweetEntity, HashtagEntity]), 
    PaginationModule
  ],
  controllers: [TweetController],
  providers: [TweetService],
  exports:[ TweetService]
}) 
export class TweetModule {}


