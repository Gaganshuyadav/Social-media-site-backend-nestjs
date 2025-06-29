import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthorizeGuard } from 'src/auth/guards/authorize.guard';

@Controller('profiles')
export class ProfileController {

    constructor( private readonly profileService:ProfileService){}

    @UseGuards(AuthorizeGuard)
    @Get("/")
    public findAllProfiles(){
        return this.profileService.getAllProfiles();
    }

}
