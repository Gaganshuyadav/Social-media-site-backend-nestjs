import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dns from "node:dns";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
  //global pipe
  app.useGlobalPipes( new ValidationPipe({
    whitelist:true,  //if extra property is come , which is not present in the DTO, then it will not include it, and the body without this property is pass to the controller
    forbidNonWhitelisted:true, // it creates an error which tells that extra property should not present and send (bad request) response to the client
    transform:true,  // ( The transform: true option in ValidationPipe tells NestJS to automatically convert incoming request payloads (plain objects) into instances of your DTO classes.) it converts the coming object to an instanceOf current DTO object
    // transformOptions:{
    //   enableImplicitConversion: true // automatically try to do implicit conversion of define datatype( Ex:- don't need to write  @Type(()=>Number) for each)
    // }
  }));

  await app.listen(process.env.PORT ?? 3000);
  
  
}
bootstrap();



// dns.lookup("localhost",( err, address, family )=>{
//   console.log("localhost IP: ",address);                                   
//   console.log("Address family: ", family===4 ? "IPv4" : "IPv6");
// })





