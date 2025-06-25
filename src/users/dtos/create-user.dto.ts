import { IsBoolean, IsEmail, IsEmpty, isNotEmpty, IsNotEmpty, IsOptional, isString, IsString, maxLength, MaxLength, MinLength} from "class-validator";
import { CreateProfileDto } from "src/profile/dto/create-profile.dto";
import { ProfileEntity } from "src/profile/profile.entity";


export class CreateUserDto{

    /* learning phase dbo */
    /*

    @IsNotEmpty()
    id: number;

    @IsString({ message: "Name should be a string value"})
    @MinLength(3,{ message:"Name should have a minimum of 3 characters."})
    @MaxLength(30)
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    gender: string;
    
    @IsEmail()
    email: string;
    
    @IsBoolean()
    isMarried: boolean;

    */


    @IsString({ message: "UserName should be a string value"})
    @MinLength(3,{ message:"UserName should have a minimum of 3 characters."})
    @MaxLength(100)     
    @IsNotEmpty()
    username: string;
    
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    email: string;                            

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    password: string;

    @IsOptional()
    profile?: CreateProfileDto | undefined;


}



