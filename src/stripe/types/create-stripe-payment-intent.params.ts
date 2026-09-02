import { PaymentIntentCreateParams, RequestOptions } from 'stripe';

export type CreatePaymentIntentParams = {
    data: PaymentIntentCreateParams;
    options?: RequestOptions;
};
