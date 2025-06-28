import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';
import { HashingProvider } from 'src/provider/hashing.provider';
import { BcryptProvider } from 'src/provider/bcrypt.provider';

@Module({
    
    imports:[forwardRef(()=>UserModule)],
    controllers:[AuthController],
    providers: [
        AuthService,
        BcryptProvider,
        {
            provide: HashingProvider,
            useClass: BcryptProvider
        }
    ],
    exports:[AuthService]
})
export class AuthModule {
    
}
