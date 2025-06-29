import { registerAs } from "@nestjs/config";


export default registerAs("auth", ()=>({
    jwtSecret: process.env.JWT_TOKEN_SECRET,
    jwtExpiresIn: parseInt( process.env.JWT_TOKEN_EXPIRESIN ?? "3600", 10),
    jwtAudience: process.env.JWT_TOKEN_AUDIENCE,
    jwtIssuer: process.env.JWT_TOKEN_ISSUER
}))



