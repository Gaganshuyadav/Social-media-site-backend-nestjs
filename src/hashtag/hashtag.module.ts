import { Module } from '@nestjs/common';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagEntity } from './hashtag.entity';
import { TweetEntity } from 'src/tweet/tweet.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([ HashtagEntity, TweetEntity])],
    controllers: [ HashtagController],
    providers: [ HashtagService],
    exports: [ HashtagService]
})
export class HashtagModule {}

