import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) {}

    create(createProductDto: CreateProductDto) {
        const product = this.productsRepository.create(createProductDto);
        return this.productsRepository.save(product);
    }

    findAll() {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve(this.productsRepository.find());
            }, 10000),
        );
    }

    findOne(id: number) {
        return this.productsRepository.findOneBy({ id });
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return this.productsRepository.save({ id, ...updateProductDto });
    }

    remove(id: number) {
        return this.productsRepository.softDelete(id);
    }

    getProductsByCategory(categoryId: number) {
        return new Promise((resolve) => {
            return setTimeout(() => {
                resolve(this.productsRepository.findBy({ category: { id: categoryId }, isActive: true }));
            }, 4000);
        });
    }
}
