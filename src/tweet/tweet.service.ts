import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { TweetEntity } from './tweet.entity';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-tweet-dto';
import { UserEntity } from 'src/users/user.entity';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { HashtagEntity } from 'src/hashtag/hashtag.entity';
import { UpdateTweetDto } from './dto/update-tweet-dto';
import { PaginationProvider } from 'src/common-for-all/pagination/pagination.provider';

/* l-p */
/*
type Tweet = {
    text:string,
    date: Date,
    userId: number
};

type ExcludeIdFromTweet = Omit<Tweet, 'userId'>;
*/

// type TweetBody = {
//     text:string,
//     imageUrl?: string,
//     user: UserEntity
// }

@Injectable()
export class TweetService {

    /* l-p */
    /*

    constructor( private usersService:UsersService){
    }

    tweets:Tweet[] = [
        {   text: "Hello NestJS!", date: new Date("2025-06-10T10:00:00Z"),   userId: 1 },
        {   text: "Learning Dependency Injection.", date: new Date("2025-06-11T12:30:00Z"),   userId: 2 },
        {   text: "NestJS makes backend easy.", date: new Date("2025-06-09T09:15:00Z"),   userId: 3 },
        {   text: "TypeScript is awesome!", date: new Date("2025-06-08T18:45:00Z"),   userId: 1 },
        {   text: "Exploring REST APIs.", date: new Date("2025-06-12T14:20:00Z"), userId: 2 },
        {   text: "Unit testing is important.", date: new Date("2025-06-13T16:10:00Z"), userId: 3 },
        {   text: "Decorators make code cleaner.", date: new Date("2025-06-14T11:05:00Z"), userId: 1 },
        {   text: "NestJS CLI boosts productivity.", date: new Date("2025-06-15T09:00:00Z"), userId: 2 }
    ];  

    getTweets( userId:number):ExcludeIdFromTweet[]{
        const user = this.usersService.users.find((user)=>Number(user.id)===Number(userId));
        const tweets = this.tweets.filter((tweet)=>tweet.userId===userId); 
        const response =  tweets.map((tweet)=>{
            //exclude userId
            const { userId, ...rest} = { ...tweet};
            return { ...rest, userName: user?.name} 
        } );    

        return response;
    }

    */

    constructor( 
        @InjectRepository(TweetEntity) private tweetRepository:Repository<TweetEntity>,
        @InjectRepository(UserEntity) private userRepository:Repository<UserEntity>,
        @Inject() private readonly userService:UsersService,
        @Inject() private readonly hashtagService:HashtagService,
        @Inject() private readonly paginationProvider:PaginationProvider<TweetEntity>
    ){}

    public async getAllTweets(){

        return this.tweetRepository.find({
            relations:{
                user:true,
                hashtags:true
            }
        });
    }

    public async createTweet( tweetBody:CreateTweetDto){

        // check if user exist or not 
        const user = await this.userRepository.findOne({
            where:{
                id: tweetBody.userId
            }
        });

        if(!user){
            throw new  NotFoundException("User Not Found");
        }

        //find hashtags body array in hashtag DB using hashtags id array
        let hashtagsA:HashtagEntity[] = [];
        if( tweetBody?.hashtags && tweetBody.hashtags.length > 0 ){
            hashtagsA = await this.hashtagService.findAllHashTagsWithHashTagsID(tweetBody.hashtags);
        }
        


        //create new tweet
        const { userId, ...newTweetBody } = { ...tweetBody};
        
        const tweet = this.tweetRepository.create({ ...newTweetBody, user:user, hashtags:hashtagsA });

        //save
        await this.tweetRepository.save(tweet);

        return {
            message:"New Tweet Created",
            tweet
        }

    }


    public async getAllTweetsByUserId(userId:number){

        //check if user exist or not
        const user = await this.userService.findUserById(userId);

        if(!user){
            throw new NotFoundException("User Not Found");
        }

        //get all tweets using userId
        const allUserTweets = await this.tweetRepository.find({
            where:{
                user:{
                    id: userId
                }
            },
            relations:{
                user:true
            },
            select:{
                user:{
                    username:true,
                    id:true
                }
            }
        })


        return allUserTweets;


    }

    // hashtags relation with tweet, in tweet also updated but not original hashtags
    public async updateTweet( tweetBody:UpdateTweetDto, tweetId:number){

        // find tweet
        const tweet = await this.tweetRepository.findOneBy({ id:tweetId});

        if(!tweet) { 
            throw new NotFoundException("Tweet Not Found");
        }

        //find hashtags and if exist then update
        if( tweetBody.hashtags){
            tweet.hashtags = await this.hashtagService.findAllHashTagsWithHashTagsID(tweetBody.hashtags);
        }
        // update text
        tweet.text = tweetBody.text ?? tweet?.text;
        // update imageUrl
        tweet.imageUrl = tweetBody.imageUrl ?? tweet.imageUrl;
    
        this.tweetRepository.save(tweet);

        return { message:"Tweet Updated Successfully"};
        
    }

    // hashtags relation with tweet, in tweet also deleted but not original hashtags
    public async deleteTweet( tweetId:number){

        // check if tweet exist
        const findTweet = await this.tweetRepository.findOneBy({ id:tweetId});

        if( !findTweet){
            throw new NotFoundException("Tweet Not Found");
        };

        await this.tweetRepository.delete({ id: findTweet.id});
        
        return { message: "Tweet Deleted Successfully"};
        

    }

    public async paginationTweets( limitQ:number, pageQ:number, userId:number){

        if(!userId){
            throw new NotFoundException(`userId is not provided`);
        }

        //check if user exist
        const findUser = await this.userService.findUserById(userId);

        if(!findUser){
            throw new NotFoundException(`User with userId ${userId} is not found`);
        }

        const whereOption = {
            user: {
                id: userId
            }
        }

        const relationOption = {
            user: true,
            hashtags:true
        }

        const countWhereOption = {
            where: {
                user: {
                    id: userId
                }
            }
        }


        return this.paginationProvider.Pagination( 
            { limit: limitQ, page: pageQ}, 
            this.tweetRepository, 
            {
                where: whereOption,
                relations: relationOption,
                countWhere: countWhereOption
            }
        );

    }
    


    
}
