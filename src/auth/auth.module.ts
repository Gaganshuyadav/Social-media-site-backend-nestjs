import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';
import { HashingProvider } from 'src/provider/hashing.provider';
import { BcryptProvider } from 'src/provider/bcrypt.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import authConfig from './config/auth.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    
    imports:[
        forwardRef(()=>UserModule),
        ConfigModule.forFeature(authConfig),
        JwtModule.registerAsync({
            imports: [ ConfigModule],
            inject: [ ConfigService],
            useFactory: ( config:ConfigService)=>({
                secret: config.get<string>("auth.jwtSecret"),
                signOptions:{
                    expiresIn: config.get< number| string>("auth.jwtExpiresIn"),
                    audience: config.get<string>("auth.jwtAudience"),
                    issuer: config.get<string>("auth.jwtIssuer")
                }
            })
        })
    ],
    controllers:[AuthController],
    providers: [
        AuthService,
        BcryptProvider,
        {
            provide: HashingProvider,
            useClass: BcryptProvider
        }
    ],
    exports:[ AuthService, JwtModule ]       //we need to export JwtModule for authorize guard 
})
export class AuthModule {
    
}
