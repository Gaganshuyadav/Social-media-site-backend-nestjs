import { Controller, Delete, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {

    constructor( private readonly profileService:ProfileService){}

    @Get("/")
    public findAllProfiles(){
        return this.profileService.getAllProfiles();
    }

}
