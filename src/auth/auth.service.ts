import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response} from "express";
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { BcryptProvider } from 'src/provider/bcrypt.provider';
import { SignUpUserDto } from './dto/signup-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService, ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import { AllowAnonymous } from './decorators/allow-anonymous.decorator';
import { AuthorizeGuard } from './guards/authorize.guard';
import { UserEntity } from 'src/users/user.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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

        // create access and refresh token
        return this.generateTokens( findUser);

    }

    public async logout( userId:string|number){

        // find user
        const findUser = await this.userService.findUserById( userId );

        if(!findUser) throw new NotFoundException("User Not Found");
        
        return {
            message: "User Logout Successfully"
        }

    }

    public async refreshToken( refreshTokenDto:RefreshTokenDto){
        
        try{

            //check if refresh token is valid 
            const { id} = await this.jwtService.verify( refreshTokenDto.refreshToken);


            //find user 
            const user = await this.userService.findUserById( id);

            if(!user){
                return new HttpException(
                    { error: "User Not Found" },
                    HttpStatus.NOT_FOUND
                );
            }

            //generate tokens
            return this.generateTokens( user);

        }
        catch(error){
            throw new UnauthorizedException(error);
        }
    }


    public async generateTokens( user:UserEntity){

        //create refresh token
        const refreshToken = await this.signToken( 
            user.id, 
            this.authConfiguration.jwtExpiresIn
        );

        //create access token
        const accessToken = await this.signToken( 
            user.id, 
            this.authConfiguration.refreshTokenExpiresIn, 
            { user: { id: user.id, email: user.email, username: user.username } }
        );

        return {
            message: "User Login Successfully",
            accessToken,
            refreshToken,
            user
        }
    }



    public async signToken<T>( userId:number, expiresIn:string, payload?:T){

        const token = await this.jwtService.signAsync({           
            id: userId,
            ...payload
        },{
            expiresIn // we can also give expiresIn time specifically , and it overrides the default expiresIn
        });

        return token;

    }









}
