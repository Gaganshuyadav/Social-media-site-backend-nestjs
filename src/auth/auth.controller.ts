import { Body, Controller, Get, Inject, ParseIntPipe, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response} from "express";
import { LoginUserDto } from './dto/login-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { AuthorizeGuard } from './guards/authorize.guard';


@Controller('auth')
export class AuthController {

    /* l-p */
    /*
    constructor( private readonly authService:AuthService){
    }

    @Post("/login")
    loginUser(@Body() body:{ name:string, password:string}, @Res() res:Response):Response{

        return this.authService.loginUser( body.name, body.password, res);
    }

    @Get("/logout")
    logoutUser( @Res() res:Response):Response{

        return this.authService.logout(res);
    }

    */

    
    constructor(
        private readonly authService:AuthService
    ){}

    @Post("/sign-up")
    public createNewUser(@Body() body:SignUpUserDto){

        return this.authService.signup(body);
    }


    @Post("/login")
    public loginUser(@Body() body:LoginUserDto ){
        return this.authService.login( body);
    }

    // @UseGuards(AuthorizeGuard)
    @Post("/sign-out")
    public logoutUser(@Body("userId", ParseIntPipe) userId:string ){
        return this.authService.logout(userId);
    }
   

}




















