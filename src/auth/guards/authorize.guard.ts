import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import authConfig from "../config/auth.config";
import { ConfigType } from "@nestjs/config";


@Injectable()
export class AuthorizeGuard implements CanActivate{

    constructor( 
        private readonly jwtService:JwtService,
        @Inject(authConfig.KEY) private readonly authConfiguration:ConfigType<typeof authConfig>
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        // Extract Request from Execution Context
        const request = context.switchToHttp().getRequest();

        // Extract Token from the Request Header
        const token = request.headers.authorization.split(" ")[1];

        if(!token){
            throw new UnauthorizedException();
        }
        
        try{
             // Validate Token and Provide/Deny Access 
            const payload = await this.jwtService.verifyAsync( token);
            request.user = payload;
            console.log(payload);
            return true;
        }
        catch( err){
            console.log(err);   
            throw new UnauthorizedException();
        }        

       
    }

}











