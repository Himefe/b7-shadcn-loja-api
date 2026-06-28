import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.set('query parser', 'extended');

    app.enableCors({
        origin: ['http://localhost:3001'],
    });
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
