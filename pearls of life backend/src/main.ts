import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGraud } from './common/guards/auth.guard';
// import * as dotenv from 'dotenv';
// dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enables automatic transformation of input types
      whitelist: true, // Strips any properties not in the DTO
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:4200'], // Replace with your frontend URLs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true, // Allow cookies if needed
  });

  await app.listen(process.env.PORT ?? 3000); //pehly yahan 3000 tha, ab 3001 kar diya hai
}
bootstrap();
