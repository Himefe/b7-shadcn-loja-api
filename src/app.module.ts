import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { StripeModule } from './stripe/stripe.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, ProductsModule, CategoriesModule, StripeModule, CheckoutModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
