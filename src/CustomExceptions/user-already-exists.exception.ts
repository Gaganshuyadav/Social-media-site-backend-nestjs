
import { HttpException, HttpStatus } from "@nestjs/common";



export class UserAlreadyExistsException extends HttpException{
    constructor( fieldName:string, fieldValue:number){
        super( `User with ${fieldName} ${fieldValue} already exists `, HttpStatus.CONFLICT);
    }
}




