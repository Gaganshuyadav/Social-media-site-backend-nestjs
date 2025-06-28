import { Injectable } from "@nestjs/common";
import { HashingProvider } from "./hashing.provider";
import * as bcrypt from "bcrypt"

@Injectable()
export class BcryptProvider implements HashingProvider{

    public async hashPassword(data: string | Buffer): Promise<string> {

        // generate salt
        const salt  = await bcrypt.genSalt(10)

        // hash the password
        return await bcrypt.hash( data, salt);
    }

    public async comparePassword( plainPassword: string, hashedPassword: string ): Promise<boolean> {

        return await bcrypt.compare( plainPassword, hashedPassword);
    } 
}


