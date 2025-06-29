import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';

import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
// import { ConfigService } from "@nestjs/config";
// import { appConfig } from 'src/config/app.config';
import { UserAlreadyExistsException } from 'src/CustomExceptions/user-already-exists.exception';
import { PaginationProvider } from 'src/common-for-all/pagination/pagination.provider';
import { BcryptProvider } from 'src/provider/bcrypt.provider';

export interface UserE {
    id: string
    name: string
    password: string
}

@Injectable()
export class UsersService {

    /* l-p */
    /*

    public users:Array<UserE> = [ 
        { id:"1", name:"gagan1", password:"1"}, 
        { id:"2", name:"gagan2", password:"2"}, 
        { id:"3", name:"gagan3", password:"3"}, 
        { id:"4", name:"gagan4", password:"4"}, 
        { id:"5", name:"gagan5", password:"5"}
    ];
    
    constructor(@Inject(forwardRef(()=>AuthService)) private readonly authService:AuthService){
    }


    getAllUsersIfAuthServiceIsActivated( res:Response){

        if( this.authService.isAuthServiceActive){
            return res.status(200).json({
                ussers: this.users
            });
        }

        return res.status(401).json({
            message:"Unauthorized"
        })

        
    }

    getAllUsers():Array<UserE>{
        return this.users;
    }

    getFirstUser():UserE{
        return this.users[0];
    }

    getUserById( id:string):UserE|undefined{
        const user = this.users.find((user)=>{
            return user.id==id
        });

        return user;

    }

    createNewUser():string{
        const findMaxId = this.users.reduce(( max, curr)=>{
            return max<Number(curr.id) ? curr.id : max;
        },0)

        this.users.push({ id:`${Number(findMaxId)+1}`, name: `gagan${Number(findMaxId)+1}`, password:`${Number(findMaxId)+1}` })
        return "New User Created!!";
    }

    */

    constructor( 
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        // @Inject() private readonly configService: ConfigService,
        @Inject( forwardRef(()=>AuthService)) private readonly authService:AuthService,
        @Inject() private readonly paginationProvider:PaginationProvider<UserEntity>,
        @Inject() private readonly bcryptProvider:BcryptProvider
    ) { }

    public async getAllUsers() {

        //environment variables 
        // const eennvv = this.configService.get<string>("im");
        // console.log(eennvv);
        // console.log(this.configService.get<string>("ca"));
        // console.log(this.configService.get<string>("ENV_MODE"));
        // console.log(appConfig())

        // get the profile table also with each user, ( we can also automatically get profile table if specifying in the user entity profile ( eager: true) )
        const findAllUsers = await this.userRepository.find({
            relations: ['profile', 'tweet'],
            // relations:{
            //     profile:true,
            // }
        });

        return findAllUsers;
    }

    public async createUser(userBody: CreateUserDto) {

        
        //check if email exist already
        const findUser = await this.userRepository.findOne({
            where: {
                email: userBody.email
            }
        });

        if (findUser) {
            throw new NotFoundException("User Already Exist");
        } 

        // ( using cascade):- add profile if not exist, and due to cascade property added the new id of profile is created , and if profile exist and their is properties in profile then that will be added in db
            userBody.profile = userBody.profile ?? {};
        


        // convert a password into hashed form
        userBody.password = await this.bcryptProvider.hashPassword(userBody.password);

        // create new user
        const user = this.userRepository.create(userBody);

        const userSaved = await this.userRepository.save(user);

        // ( we can also do manually by create profile first and then save and then give profile to body of user and then save the new user, but cascade is easier way it automatically creates the profile and object is empty)



        return user;

        

    }

    public async deleteUserById__AlongWithAllProfiles(id: number) {

        // find user by id
        const findUser = await this.userRepository.findOne({
            where: {
                id
            },
            relations: {
                profile: true
            },
            select: {
                profile: {
                    id: true
                }
            }
        })



        if (!findUser){
            throw new NotFoundException("User Not Found");
        }

        // delete user by id ( the onDelete:"CASCADE" the profile is also deleted )
        await this.userRepository.delete({ id });

        // delete profile using user ( if  onDelete: "CASCADE" is not defined)
        // await this.profileRepository.delete({ id: findUser.profile?.id })

        return { message: "User Deleted Successfully" };

    }



    public async findUserById(id: number|string) {
        return this.userRepository.findOneBy({ id: Number(id) });
    }

    public async paginationUsers( limitQ:number, pageQ:number, userId:number){

        if(!userId){
            throw new NotFoundException(`userId is not provided`);
        }

        //check if user exist
        const findUser = await this.findUserById(userId);

        if(!findUser){
            throw new NotFoundException(`User with userId ${userId} is not found`);
        }

        const whereOption = {
                id: userId
        }

        const relationOption = {
            profile: true,
            tweet: true
        }


        return this.paginationProvider.Pagination( 
            { limit: limitQ, page: pageQ}, 
            this.userRepository, 
            {
                where: whereOption,
                relations: relationOption,
            }
        );

    }

    public async findUserByEmail( email:string, { password=false, profile=false, tweet=false }:{ password?:boolean, profile?:boolean, tweet?:boolean} ){

        try{

            const findUser = await this.userRepository.findOne({
                where: {
                    email
                },
                select:{
                    password,
                    id:true,
                    username:true,
                    email:true,
                    createdAt:true,
                    updatedAt:true,
                    deletedAt: true
    
                },
                relations:{
                    tweet,
                    profile
                }
            });

            return findUser;

        }
        catch(err){

            if (err.code === "ECONNREFUSED") {

                throw new RequestTimeoutException({
                    error: err.errors[0],
                    message: "Request Timeout",
                    description: "Could not connect to the database"
                })

            }
            else if( err.code === "23505" ) {
                
                throw new BadRequestException({
                    error: "Duplicate User",
                    message: "try to create duplicate user in the database"
                })
            }
            else if( err.status===400){
                throw err;
            }
            else {
                throw new RequestTimeoutException("Something went wrong");
            }

        }



    }



















    /* l-p */
    public async exceptionHandlingFiltersPractice() {

        /*(i). not found exception */
        /*
        throw new NotFoundException({
            status: HttpStatus.NOT_FOUND,
            error: "Not Found",
            message:`User with userId 1234 is not found!`
        });
        */

        /*(ii). Build-in Exception  */

        /*
        try{

            const findUser = await this.userRepository.findOne({
                where:{ email:'gagan1@gmail.com'}
            })

            //if user already exist
            if(findUser){
                throw new BadRequestException("User Already Exist in Database");
            }

            
            



            const userBody = {
                id:1,
                username: "gaganshuyadav1",
                email: "gagan1@gmail.com",
                password: "11111111",
                profile: {
                    firstName: "gagan1",
                    lastName: "yadav",
                    gender: "male",
                    bio: "software dev"
                }
            }

            // create new user
            const user = this.userRepository.create(userBody);
    
            const userSaved = await this.userRepository.save(user);
    
            return user;
    }
    catch(err) {
        console.log("------------------------");
        console.log(err);
        console.log("++++++++++++++++++++++++");
        console.log(err.length)
        console.log("========================");
        console.log()
        console.log("************************");
        
        if (err.code === "ECONNREFUSED") {

            throw new RequestTimeoutException({
                error: err.errors[0],
                message: "Request Timeout",
                description: "Could not connect to the database"
            })

        }
        else if( err.code === "23505" ) {
            throw new BadRequestException({
                error: "Duplicate User",
                message: "try to create duplicate user in the database"
            })
        }
        else if( err.status===400){
            throw err;
        }
        else {
            throw new RequestTimeoutException("Something went wrong");
        }
    }

    */

        /*(iii). Custom Exception using Http Exception */

        /*
        const id=1222;
        const user = await this.userRepository.findOneBy({ id});
        
        if(!user){
 
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: `The user with ID ${id} was not found`,
                table:"users"
                },
                HttpStatus.NOT_FOUND,
                {
                    description: `The exception occured because a user with ID ${id} was not found in users table`
                }
            );
        }

        */

        /*(iv). Creating a Custom Exception Class */

        
        const id=30;
        const user = await this.userRepository.findOneBy({ id});
        
        if(user){
            throw new UserAlreadyExistsException( "id", id);
        }

        
}


}
