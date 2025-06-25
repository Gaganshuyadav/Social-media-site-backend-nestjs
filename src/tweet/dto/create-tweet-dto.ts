import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";



export class CreateTweetDto{

    @IsNotEmpty()
    @IsString()
    text: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;           

    @IsNotEmpty()  
    @IsInt()
    userId:number;

    @IsOptional()
    @IsInt({ each:true})  // validate if each element in an array is integer type
    @IsArray()
    hashtags?: number[]    

}



