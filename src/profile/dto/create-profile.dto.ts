import { IsBoolean, IsDate, IsEmail, IsEmpty, isNotEmpty, IsNotEmpty, IsOptional, isString, IsString, maxLength, MaxLength, MinLength} from "class-validator";


export class CreateProfileDto{

    
    @IsString({ message: "Fisrst Name should be a string value"})
    @MinLength(3,{ message:"First Name should have a minimum of 3 characters."})
    @MaxLength(100)     
    @IsNotEmpty()
    @IsOptional()
    firstName?: string;

    @IsString({ message: "Last Name should be a string value"})
    @MinLength(3,{ message:"Last Name should have a minimum of 3 characters."})
    @MaxLength(100)
    @IsNotEmpty()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    @IsOptional()
    gender?: string;
    
    @IsDate()
    @IsOptional()
    dataOfBirth?: Date;

    @IsString()
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    profileImage?: string;



}
