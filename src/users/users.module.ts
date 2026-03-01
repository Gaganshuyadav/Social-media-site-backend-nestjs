import { forwardRef, Module} from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthModule } from "../auth/auth.module";
import { UserEntity } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaginationModule } from "src/common-for-all/pagination/pagination.module";
import { BcryptProvider } from "src/provider/bcrypt.provider";
import { HashingProvider } from "src/provider/hashing.provider";
import { ConfigModule, ConfigService } from "@nestjs/config";
import authConfig from "src/auth/config/auth.config";
import { JwtModule } from "@nestjs/jwt";
import { AuthorizeGuard } from "src/auth/guards/authorize.guard";
import { APP_GUARD } from "@nestjs/core";



@Module({
  imports: [  
    TypeOrmModule.forFeature([UserEntity]), 
    forwardRef(()=>AuthModule) , // required for auth guards
    ConfigModule.forFeature(authConfig),
    // PaginationModule
  ],    
  controllers: [ UsersController ],
  providers: [
    UsersService,
    BcryptProvider,
    {
      provide: HashingProvider,
      useClass: BcryptProvider 
    },
    
    //it applies auth guards globally
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthorizeGuard
    // }
   ],
  exports: [ UsersService]
})
export class UserModule{

}





