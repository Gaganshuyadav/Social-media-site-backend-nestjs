import { forwardRef, Module } from '@nestjs/common';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagEntity } from './hashtag.entity';
import { TweetEntity } from 'src/tweet/tweet.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/auth/config/auth.config';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([ HashtagEntity, TweetEntity]),
        forwardRef(()=>AuthModule),
        ConfigModule.forFeature(authConfig),
    ],
    controllers: [ HashtagController],
    providers: [ 
        HashtagService,

    ],
    exports: [ HashtagService]
})
export class HashtagModule {}

