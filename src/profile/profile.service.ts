import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './profile.entity';
import { Repository } from 'typeorm';
import { ConfigType } from '@nestjs/config';
import profileConfig from './config/profile.config';

@Injectable()
export class ProfileService {

    constructor( 
        @InjectRepository(ProfileEntity) 
        private profileRepository:Repository<ProfileEntity> ,
        
        @Inject(profileConfig.KEY)
        private readonly profileConfiguration: ConfigType<typeof profileConfig> 
    ){}

    public async getAllProfiles(){

        console.log( this.profileConfiguration); //it contains the all profile config env variables

        const findAllProfiles = await this.profileRepository.find({
            relations:{
                user: true   
            }
        });

        return findAllProfiles;
    }
}
