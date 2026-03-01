import { Body, Controller, Get, HttpCode, HttpStatus, Inject, ParseIntPipe, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response} from "express";
import { LoginUserDto } from './dto/login-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { AuthorizeGuard } from './guards/authorize.guard';
import { AllowAnonymous, Roles } from './decorators/allow-anonymous.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';


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

    @AllowAnonymous()
    @Post("/refresh-token")
    @HttpCode(HttpStatus.OK)
    public refreshToken( @Body() body:RefreshTokenDto){
        return this.authService.refreshToken( body);
    }


    @AllowAnonymous()
    @Roles("all")
    @UseGuards(AuthorizeGuard)
    @Post("/login")
    @HttpCode(HttpStatus.OK)
    public loginUser(@Body() body:LoginUserDto ){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        return this.authService.login( body);
    }

    // @UseGuards(AuthorizeGuard)
    @Post("/sign-out")
    public logoutUser(@Body("userId", ParseIntPipe) userId:string ){
        return this.authService.logout(userId);
    }
   

}




















