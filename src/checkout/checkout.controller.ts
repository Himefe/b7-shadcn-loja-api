import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';

@Controller('checkout')
export class CheckoutController {
    constructor(private readonly checkoutService: CheckoutService) {}

    @Post('create-payment-intent')
    createCheckoutSession(@Body() dto: CreateCheckoutSessionDto) {
        return this.checkoutService.createPaymentIntent(dto);
    }
}
