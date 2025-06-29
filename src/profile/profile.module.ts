import { forwardRef, Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './profile.entity';
import { UserEntity } from 'src/users/user.entity';
import { ConfigModule } from '@nestjs/config';
import profileConfig from './config/profile.config';
import { AuthModule } from 'src/auth/auth.module';
import authConfig from 'src/auth/config/auth.config';


@Module({
    imports:[ 
        TypeOrmModule.forFeature([ProfileEntity, UserEntity]),
        ConfigModule.forFeature(profileConfig),
        ConfigModule.forFeature(authConfig),
        forwardRef(()=>AuthModule) , // required for auth guards
    ],
    controllers: [ ProfileController],
    providers: [ ProfileService],
    exports: [ ProfileService]
})
export class ProfileModule {}
