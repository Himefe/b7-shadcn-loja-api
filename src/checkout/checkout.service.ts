import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { In, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCheckoutPaymentIntentDto } from './dto/create-checkout-payment-intent.dto';

@Injectable()
export class CheckoutService {
    constructor(
        private readonly stripeService: StripeService,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) {}

    async createPaymentIntent({ products, user }: CreateCheckoutPaymentIntentDto) {
        const productsDatabase = await this.productsRepository.findBy({
            id: In(products.map((product) => product.id)),
        });

        const { lineItems, amount } = products.reduce<{
            lineItems: Array<{
                quantity: number;
                unit_cost: number;
                product_code: string;
                product_name: string;
            }>;
            amount: number;
        }>(
            (acc, curr) => {
                const productDB = productsDatabase.find((item) => item.id === Number(curr.id));

                return {
                    ...acc,
                    lineItems: [
                        ...acc.lineItems,

                        {
                            quantity: curr.quantity,
                            unit_cost: productDB?.price || 0,
                            product_code: productDB?.sku || '',
                            product_name: productDB?.name || '',
                        },
                    ],
                    amount: acc.amount + (productDB?.price || 0) * curr.quantity,
                };
            },
            {
                lineItems: [],
                amount: 0,
            },
        );

        const session = await this.stripeService.createPaymentIntent({
            data: {
                amount,
                allowed_payment_method_types: ['card', 'boleto'],
                receipt_email: user.email,
                amount_details: {
                    line_items: lineItems,
                },
                metadata: {
                    orderId: 110,
                },
                currency: 'brl',
            },
        });

        return {
            clientSecret: session.client_secret,
        };
    }
}
