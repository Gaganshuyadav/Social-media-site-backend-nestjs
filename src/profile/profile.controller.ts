import { Controller, Delete, Get, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthorizeGuard } from 'src/auth/guards/authorize.guard';

@Controller('profiles')
export class ProfileController {

    constructor( private readonly profileService:ProfileService){}

    @UseGuards(AuthorizeGuard)
    @Get("/")
    public findAllProfiles(@Req() request){

         console.log("user in request after auth check : ",request.user);

        return this.profileService.getAllProfiles();
    }

}
