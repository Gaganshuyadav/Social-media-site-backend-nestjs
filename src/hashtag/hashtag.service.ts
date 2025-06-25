import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashtagEntity } from './hashtag.entity';
import { In, Repository } from 'typeorm';
import { CreateHashtagDto } from './dto/create-hashtag-dto';

@Injectable()
export class HashtagService {
    constructor( 
        @InjectRepository(HashtagEntity) private hashtagRepository:Repository<HashtagEntity>
    ){}

    public async createHashtag( hashtagBody:CreateHashtagDto){

        //create hashtag
        const hashtag = this.hashtagRepository.create(hashtagBody);

        await this.hashtagRepository.save(hashtag);

        return hashtag;

    }

    public async findAllHashTagsWithHashTagsID( hashtags:Array<number> ):Promise<Array<HashtagEntity>>{

        const hts = await this.hashtagRepository.find({
            where:{
                id: In(hashtags) 
            }
        })

        return hts;

    }

    public async deleteHashtag( hashtagId:number){

        //find hashtag
        const hashtag = await this.hashtagRepository.findOne({ where:{ id:hashtagId} });

        if(!hashtag) { 
            throw new NotFoundException("Hashtag Not Found");
        }; 

        //delete 
        await this.hashtagRepository.delete({ id: hashtag.id});

        return { message:"Hashtag deleted successfully"};
    }


    public async softDeleteHashtag( hashtagId:number){

        //find hashtag
        const hashtag = await this.hashtagRepository.findOne({ where:{ id:hashtagId} });

        if(!hashtag){ 
            throw new NotFoundException("Hashtag Not Found");
        }; 

        //delete 
        await this.hashtagRepository.softDelete({ id: hashtag.id}); // deletedAt value is initialized with time value, and we can use this value to show hashtags in UI on basis on time condition
        
        //we can restore it also
        // await this.hashtagRepository.restore({id: hashtagId}); // it again change the value of deletedAt to null

        return { message:"Hashtag Soft deleted successfully"};
    }

}
