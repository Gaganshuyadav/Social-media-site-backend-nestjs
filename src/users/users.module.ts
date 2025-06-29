import { forwardRef, Module} from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthModule } from "../auth/auth.module";
import { UserEntity } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaginationModule } from "src/common-for-all/pagination/pagination.module";
import { BcryptProvider } from "src/provider/bcrypt.provider";
import { HashingProvider } from "src/provider/hashing.provider";
import { ConfigModule } from "@nestjs/config";
import authConfig from "src/auth/config/auth.config";



@Module({
  imports: [  
    TypeOrmModule.forFeature([UserEntity]), 
    forwardRef(()=>AuthModule) , // required for auth guards
    ConfigModule.forFeature(authConfig),
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





