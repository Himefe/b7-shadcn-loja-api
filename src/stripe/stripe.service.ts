import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreatePaymentIntentParams } from './types/create-stripe-payment-intent.params';

@Injectable()
export class StripeService {
    private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    createPaymentIntent({ data, options }: CreatePaymentIntentParams): Promise<Stripe.Response<Stripe.PaymentIntent>> {
        return this.stripe.paymentIntents.create(data, options);
    }
}
