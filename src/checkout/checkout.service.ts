import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { In, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';

@Injectable()
export class CheckoutService {
    constructor(
        private readonly stripeService: StripeService,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) {}

    async createPaymentIntent({ products, userName }: CreateCheckoutSessionDto) {
        const productsDatabase = await this.productsRepository.findBy({
            id: In(products.map((product) => product.id)),
        });

        const lineItems = products.map((product) => ({
            id: product.id,
            quantity: product.quantity,
            price: productsDatabase.find((item) => item.id === Number(product.id))?.price || 0,
        }));

        const session = await this.stripeService.createPaymentIntent({
            userName,
            lineItems,
        });

        return {
            clientSecret: session.client_secret,
        };
    }
}
