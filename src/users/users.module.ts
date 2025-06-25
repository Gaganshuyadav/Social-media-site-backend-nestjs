import { forwardRef, Module} from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthModule } from "../auth/auth.module";
import { UserEntity } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileEntity } from "src/profile/profile.entity";
import { TweetEntity } from "src/tweet/tweet.entity";


@Module({
  imports: [  TypeOrmModule.forFeature([UserEntity, ProfileEntity, TweetEntity]), forwardRef(()=>AuthModule) ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [ UsersService]
})
export class UserModule{

}


