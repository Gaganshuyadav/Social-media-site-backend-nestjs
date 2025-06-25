import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Res, ValidationPipe } from "@nestjs/common";
import { UserE, UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { GetWithIsMarriedParamDto } from "./dtos/get-with-isMarried-param.dto";
import { UpdateUserDTO } from "./dtos/update-user.dto";
import { Response} from "express";

@Controller("users")
export class UsersController{
    constructor(private readonly usersService:UsersService){
    }

    /* learning phase */

        /*(i). Basics */
        /*

    @Get() 
    getAllUsers():Array<User>{
        return this.usersService.getAllUsers();
    }

    @Get("/create")
    createNewUser():string{
        return this.usersService.createNewUser();
    }
 
    @Get("/user")
    getFirstUser():User{
        return this.usersService.getFirstUser();
    }

    @Get("/:id/:name/:gender")
    // getUserById(@Param() params:any):any{     //gives all params
    getUserByIdUsingParams(@Param("id") id:string, @Param("name") name:string, @Param("gender") gender:string ):any{
        
        const user = this.usersService.getUserById(id);

        if(user){
            return user;
        }
        else{
            return { message:"User Not Found"};
        }

    }

    
    @Get("/:id/:name")
    getUserByIdUsingQuery(@Param("id") id:string, @Query() query:any, @Query("gender") gender:string):any{

        console.log(" id(params):   " ,id);
        console.log(" query:   " ,query);
        console.log(" gender(query):   " ,gender); 
        
        const user = this.usersService.getUserById(id);

        if(user){
            return user;
        }
        else{
            return { message:"User Not Found"};
        }

    }
    */

        /*(ii). Pipes :- data validation, data transformation, data sanitization*/
        /*

    // ParseIntPipe used to convert string to number
    // DefaultValuePipe is used to give default value if path does not contain query ( default value set if value is undefined means value is not given as query)
    @Get("/:id/:name")
    getUserByIdUsingQuery( @Param("id", ParseIntPipe) id:number, @Query("page", new DefaultValuePipe(10), ParseIntPipe) page:number, @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit:number ):any{
    
        console.log("id: ", id, "  type  ", typeof id);
        console.log("page: ", page," type ", typeof page); 
        console.log("limit: ", limit, "type", typeof limit);


        const user = this.usersService.getUserById(String(id));

        if(user){
            return user;
        }
        else{
            return { message:"User Not Found"};
        }

    }


    @Post("/create")
    //if we want to use ValidationPipe, then we need to use [class-transformer] package and also [class-validator] package for making the class of validation
    // createNewUser(@Body( new ValidationPipe()) user:CreateUserDto){
    createNewUser( @Body() user:CreateUserDto){   // we can use useGlobalPipes globally across the entire application ( ).  
        
        return user;
    }

    // DTO with Route Parameter
    @Get("/:isMarried")
    getAllUsersWithIsMarriedParam(@Param() param:GetWithIsMarriedParamDto){
        console.log(param);
        return param;
    } 

    //udate user with DTO
    //----( create and update of user body is same but in update any value can be optional)---------------------------------------------------------------------------------------------------------------------------------------------------------------
    //use @nestjs/mapped for taking the PartialType  ( so that DRY( Don't Repeat Yourself) not violate )

    @Patch("/:id")
    updateUser(@Body() updateBody:UpdateUserDTO, @Param("id") id:string){
        console.log(updateBody);
        console.log(id);
        return updateBody;
    }

    




    */

        /*(iii). circular dependency example*/
        /*
    @Get("/all-users-if-authentication-activated")
    getAllUsersIfAuthServiceIsActivated(@Res() res:Response):Response{
        
        return this.usersService.getAllUsersIfAuthServiceIsActivated( res);
    }

    */


    @Get("/")
    public findAllUsers(){
        return this.usersService.getAllUsers();
    }

    @Post("/create")
    public createNewUser(@Body() body:CreateUserDto){
        return this.usersService.createUser(body);
    }

    @Delete("/:id")
    public deleteUserById( @Param("id") id:string){
        
        return this.usersService.deleteUserById__AlongWithAllProfiles( Number(id) );
    }

    @Get("/error-practice")
    public exceptionHandlingFiltersPractice(){

        return this.usersService.exceptionHandlingFiltersPractice();
    }

    




};




