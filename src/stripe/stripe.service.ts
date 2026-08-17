import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    createPaymentIntent({ userName, lineItems }: { userName: string; lineItems: Array<{ price: number; quantity: number }> }): Promise<Stripe.Response<Stripe.PaymentIntent>> {
        const amount = Math.round(lineItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0) * 100);

        return this.stripe.paymentIntents.create({
            amount,
            allowed_payment_method_types: ['card', 'boleto'],
            metadata: {
                userName,
            },
            currency: 'brl',
        });
    }
}
