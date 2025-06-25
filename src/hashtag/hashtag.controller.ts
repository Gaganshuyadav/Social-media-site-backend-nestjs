import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag-dto';

@Controller('hashtags')
export class HashtagController {

    constructor( private readonly hashtagService:HashtagService){}

    @Post("/create")
    public async createNewHashtag(@Body() body:CreateHashtagDto){
        return this.hashtagService.createHashtag(body);
    }


    @Delete("/:id")
    public async deleteHashtag(@Param("id", ParseIntPipe) id:number){
        return this.hashtagService.deleteHashtag(id);
    }


    @Delete("/soft-delete/:id")
    public async softDeleteHashtag(@Param("id",ParseIntPipe) id){
        return this.hashtagService.softDeleteHashtag(id);
    }





}
