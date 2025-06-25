import { IntersectionType } from "@nestjs/mapped-types";
import { Type } from "class-transformer"
import { IsDate, IsOptional, IsPositive,  } from "class-validator"

class PaginationQueryDto{

    @IsOptional() 
    @IsPositive()
    @Type(()=>Number) 
    limit?: number=10;

    @IsOptional()  
    @IsPositive()
    @Type(()=>Number)
    page?: number=1;
    
}

class PaginationQueryWithDateRangeDto{

    @IsOptional()
    @Type(()=>Date)
    @IsDate()
    startdate?: Date;

    @IsOptional()
    @Type(()=>Date)
    @IsDate()
    enddate?: Date;
}


class PaginationQueryWithBaseAndDate extends IntersectionType(
    PaginationQueryDto, 
    PaginationQueryWithDateRangeDto
){
}


export { PaginationQueryDto, PaginationQueryWithDateRangeDto, PaginationQueryWithBaseAndDate};



