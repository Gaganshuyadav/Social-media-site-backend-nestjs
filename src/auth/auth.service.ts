import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Response} from "express";
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { BcryptProvider } from 'src/provider/bcrypt.provider';
import { SignUpUserDto } from './dto/signup-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService, ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';

@Injectable()
export class AuthService {

    

    /* l-p */
    
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

    constructor(
        @Inject(forwardRef(()=>UsersService)) private readonly userService:UsersService,
        @Inject() private readonly bcryptProvider:BcryptProvider,
        private readonly jwtService:JwtService,
        
        
        @Inject(authConfig.KEY) private readonly authConfiguration: ConfigType< typeof authConfig>
    ){}


    public async signup( signUpData:SignUpUserDto){

        // create new  user
        const createNewUser = await this.userService.createUser( signUpData);
 
        return {
            message: "User Created Successfully",
            user: createNewUser
        }

    }

    public async login( loginData:LoginUserDto){

        const findUser = await this.userService.findUserByEmail(loginData.email, { password:true, tweet:true, profile:true} );
        
        if(!findUser) throw new NotFoundException("User Not Found");
        
        
        const isAuth = await this.bcryptProvider.comparePassword( loginData.password, findUser.password);


        if(!isAuth){ 
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: "Invalid email or password"
            },
            HttpStatus.UNAUTHORIZED
            );
        }

        // create jwt
        const jwt = await this.jwtService.signAsync({
            id: findUser.id,
            user: {
                id: findUser.id,
                email: findUser.email,
                username: findUser.username
            }
        },{ 
            expiresIn: "5h"   // we can also give expires time specifically 
        });


        return {
            message: "User Login Successfully",
            token: jwt,
            user: findUser
        }

    }

    public async logout( userId:string|number){

        // find user
        const findUser = await this.userService.findUserById( userId );

        if(!findUser) throw new NotFoundException("User Not Found");
        
        return {
            message: "User Logout Successfully"
        }

    }






}
