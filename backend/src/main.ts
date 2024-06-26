import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS configuration
  app.enableCors({
    // origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Replace with your frontend URL or allow all origins
    origin: ['http://localhost:3000', 'http://localhost:3001' ], // Replace with your frontend URL or allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  const port = process.env.PORT || 3000; // Default port 3000 if not specified
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
