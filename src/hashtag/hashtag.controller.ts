import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag-dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { AuthorizeGuard } from 'src/auth/guards/authorize.guard';

@Controller('hashtags')
export class HashtagController {

    constructor( private readonly hashtagService:HashtagService){}

    @Post("/create")
    public async createNewHashtag(@Body() body:CreateHashtagDto){
        return this.hashtagService.createHashtag(body);
    }

    @UseGuards(AuthorizeGuard)
    @Get("/") 
    public async getAllHashtags( @ActiveUser("email") user){
        console.log("user:-----  ",user);
        return this.hashtagService.getAllHashtags();
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
