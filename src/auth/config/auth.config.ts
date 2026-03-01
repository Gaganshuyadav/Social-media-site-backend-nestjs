import { registerAs } from "@nestjs/config";


export default registerAs("auth", ()=>({
    jwtSecret: process.env.JWT_TOKEN_SECRET,
    jwtExpiresIn: process.env.JWT_TOKEN_EXPIRESIN || "5h",
    jwtAudience: process.env.JWT_TOKEN_AUDIENCE,
    jwtIssuer: process.env.JWT_TOKEN_ISSUER,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRESIN || "10h"
}))



