import { forwardRef, Module} from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthModule } from "../auth/auth.module";
import { UserEntity } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileEntity } from "src/profile/profile.entity";
import { TweetEntity } from "src/tweet/tweet.entity";
import { PaginationModule } from "src/common-for-all/pagination/pagination.module";
import { BcryptProvider } from "src/provider/bcrypt.provider";
import { HashingProvider } from "src/provider/hashing.provider";


@Module({
  imports: [  
    TypeOrmModule.forFeature([UserEntity, ProfileEntity, TweetEntity]), 
    forwardRef(()=>AuthModule), 
    PaginationModule
  ],    
  controllers: [ UsersController ],
  providers: [
    UsersService,
    BcryptProvider,
    {
      provide: HashingProvider,
      useClass: BcryptProvider 
    }
   ],
  exports: [ UsersService]
})
export class UserModule{

}




