import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import authConfig from "../config/auth.config";
import { ConfigType } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { REQUEST_USER_KEY } from "../constants/constants";


@Injectable()
export class AuthorizeGuard implements CanActivate{

    constructor( 
        private readonly jwtService:JwtService,
        @Inject(authConfig.KEY) private readonly authConfiguration:ConfigType<typeof authConfig>,
        private readonly reflector:Reflector
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        //check if route is public
        // const isPublic = this.reflector.getAllAndOverride("isPublic", [ context.getHandler(), context.getClass()]);
        const isPublic = this.reflector.get("isPublic", context.getHandler());
        
        //check if this route exist for all roles
        // const requiredRoles = this.reflector.get<string[]|"all">("roles", context.getHandler());

        if(isPublic){
            return true;
        }

        //it means it applies for all
        // if( requiredRoles!=="all" || requiredRoles.length===0 ){
        //     return false;
        // }

        // Extract Request from Execution Context
        const request = context.switchToHttp().getRequest();

        // Extract Token from the Request Header
        const token = request.headers.authorization?.split(" ")[1];

        if(!token){
            throw new UnauthorizedException();
        }
        
        try{
             // Validate Token and Provide/Deny Access 
            const payload = await this.jwtService.verifyAsync( token);
            request[REQUEST_USER_KEY] = payload.user;
            console.log("auth is active now")
            return true;
        }
        catch( err){
            console.log(err);   
            throw new UnauthorizedException();
        }        

       
    }

}











