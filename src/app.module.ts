import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TweetModule } from './tweet/tweet.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { PaginationModule } from './common-for-all/pagination/pagination.module';
import databaseConfig from './config/database.config';
import envValidation from './config/env.validation';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizeGuard } from './auth/guards/authorize.guard';
import authConfig from './auth/config/auth.config';

const N_ENV = process.env.NODE_ENV;


@Module({
  imports: [ 
    // Modules
    UserModule,  
    AuthModule, 
    TweetModule,
    ProfileModule,
    HashtagModule,
    PaginationModule,
    ConfigModule.forFeature(authConfig),
    //config env 
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: !N_ENV ? ".env" : `.env.${N_ENV.trim()}`, //trim is important, cause the env value can have space
      load:[ appConfig, databaseConfig],
      validationSchema: envValidation
    }),
    // ORM  
    TypeOrmModule.forRootAsync({ 
      imports:[ ConfigModule],   // -- Import ConfigModule
      inject:[ ConfigService],    // -- Inject ConfigService
      useFactory: ( configService:ConfigService )=>({
        logging: configService.get<boolean>('database.logging'),
        // entities:[ UserEntity, ProfileEntity],  // -- import entities
        autoLoadEntities: configService.get<boolean>('database.autoLoadEntities'), // without adding /entities in the entities array , the entities are automatically added when add in the models. ( auto loading )
        synchronize: configService.get<boolean>('database.synchronize'),   // -- synchronize: false ( production) and -- synchronize: true ( development)
        type: configService.get<'mysql' | 'postgres' | 'sqlite' | 'aurora-mysql'>('database.type')!,
        host: configService.get<string>('database.host'),
        port: Number(configService.get<string>('database.port')),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name')
        
      })
    })
  ],
  controllers: [AppController],  
  providers: [AppService,
    // {                             // now it is globally authenticate with guard present
    //   provide: APP_GUARD,
    //   useClass: AuthorizeGuard
    // }
  ],
})
export class AppModule {}
                                




