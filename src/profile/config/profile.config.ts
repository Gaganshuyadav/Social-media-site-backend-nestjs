import { registerAs } from "@nestjs/config";

export default registerAs("profile", ()=>({
    profileManager: process.env.PROFILE_MANAGER,
    profileManagerPower: process.env.PROFILE_MANAGER_POWER
}))
