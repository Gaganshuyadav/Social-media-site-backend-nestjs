import { BadRequestException } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsBoolean } from "class-validator";



export class GetWithIsMarriedParamDto{

    
    @IsBoolean()
    //send bad request if the value is not true or false
    @Transform( ( { value})=> {
        if( value=="true"){ return true}
        if( value=="false"){ return false}
        throw new BadRequestException("isMarried must be true or false" );
    })        
    isMarried:boolean
}

