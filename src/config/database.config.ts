import { registerAs } from "@nestjs/config";

export default registerAs("database",()=>({
        type: process.env.DB_TYPE || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT as string, 10) || 5432,
        username: process.env.DB_USERNAME, 
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
        autoLoadEntities: process.env.DB_AUTOLOADENTITIES === 'true' || false,
        logging: process.env.DB_LOGGING === 'true' || false,
}))

