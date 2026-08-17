// stripe.module.ts

import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { StripeModule } from '../stripe/stripe.module';

@Module({
    imports: [TypeOrmModule.forFeature([Product]), StripeModule],
    providers: [CheckoutService],
    controllers: [CheckoutController],
})
export class CheckoutModule {}
