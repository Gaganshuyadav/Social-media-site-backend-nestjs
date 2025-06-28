import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { UsersService } from 'src/users/users.service';
import { CreateTweetDto } from './dto/create-tweet-dto';
import { UpdateTweetDto } from './dto/update-tweet-dto';
import { PaginationQueryDto, PaginationQueryWithBaseAndDate } from './dto/filter-pagination-tweet-dto';

@Controller('tweets')
export class TweetController {

    /* l-p */
    /*
    constructor(private tweetService:TweetService){

    }

    // Inter-modular Dependency Injection example
    @Get("/:userId")
    public getAllTweets(@Param("userId", ParseIntPipe) userId:number){
        return this.tweetService.getTweets(userId);
    }

    */
 
    constructor(private readonly tweetService:TweetService){}

    @Post("/create")
    public createNewTweet(@Body() body:CreateTweetDto){

        return this.tweetService.createTweet(body);

    }

    @Get("/")
    public getAllTweets(){

        return this.tweetService.getAllTweets();
    }

    @Get("/user/:id")
    public getAllTweetsByUserId( @Param("id",ParseIntPipe) userId:number){

        return this.tweetService.getAllTweetsByUserId( userId);
    }

    @Patch("/:id")
    public updateTweet(@Body() tweetBody:UpdateTweetDto, @Param("id",ParseIntPipe) tweetId:number){

        return this.tweetService.updateTweet( tweetBody, tweetId);
    }

    @Delete("/:id")
    public deleteTweet(@Param("id",ParseIntPipe) tweetId:number){

        return this.tweetService.deleteTweet( tweetId);
    }


    @Get(`/filter/pagination/:id`)
    public paginationTweets( @Query() param:PaginationQueryDto, @Param("id", ParseIntPipe) userId:number, @Query("limit", ParseIntPipe) limit:number, @Query("page", ParseIntPipe) page:number){
        
        return this.tweetService.paginationTweets( limit, page, userId);
    }

    
}


