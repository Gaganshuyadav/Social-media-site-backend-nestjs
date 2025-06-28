import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpUserDto{

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
}

