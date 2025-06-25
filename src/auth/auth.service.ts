import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Response} from "express";
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    /* learning phase */
    
    /*

    public isAuthServiceActive = false;
    
    constructor(@Inject(forwardRef(()=>UsersService)) private readonly userService:UsersService){
    }

    loginUser( name:string, password:string, res:Response):Response{

        //find User
        const findUser = this.userService.users.find((user)=>{
            return user.name === name;
        })

        if(!findUser){
            return res.status(404).json({
                message:"User Not Found"
            })
        }
        
        this.isAuthServiceActive = true;
       
        
        return res.status(200).json({
            userName: findUser.name,
            message:"You are now logged in"
        });
    }

    logout( res:Response):Response{

        this.isAuthServiceActive = false;

        return res.status(200).json({
            message:"You are now logged out"
        });
    }

    */

}
