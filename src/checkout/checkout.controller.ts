import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutPaymentIntentDto } from './dto/create-checkout-payment-intent.dto';

@Controller('checkout')
export class CheckoutController {
    constructor(private readonly checkoutService: CheckoutService) {}

    @Post('create-payment-intent')
    createCheckoutSession(@Body() dto: CreateCheckoutPaymentIntentDto) {
        return this.checkoutService.createPaymentIntent(dto);
    }
}
