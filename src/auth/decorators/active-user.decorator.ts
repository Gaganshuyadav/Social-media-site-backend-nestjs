import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ActiveUserType } from "../interfaces/active-user.type.interface";


export const ActiveUser = createParamDecorator( (data: keyof ActiveUserType | undefined, context:ExecutionContext)=>{

    console.log("---------------")
    console.log(data);
    console.log("---------------")
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log("*******************")
    console.log("user: ",user)
    console.log("*******************")
    return data ? user[data] : user;
})