import { SetMetadata } from "@nestjs/common"


// export const AllowAnonymous = ( para)=>{
//     console.log(para);
//     return ( target:any, propertyKey:string, descriptor:PropertyDescriptor)=>{        
//     }
// }

export const AllowAnonymous = ()=>{
    
    return SetMetadata("isPublic", true);
}

export const Roles = ( roles:string[]|"all") =>{
    return SetMetadata("roles", roles);
}



