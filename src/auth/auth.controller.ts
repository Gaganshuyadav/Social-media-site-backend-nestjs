import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response} from "express";

@Controller('auth')
export class AuthController {

    /* learning phase */
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
   

}




















