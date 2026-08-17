import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { HttpQueryFilter } from '../types/query';

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

    findAll(queryFilter?: HttpQueryFilter['filter']) {
        const categories = Array.isArray(queryFilter?.categories) ? queryFilter.categories : [queryFilter?.categories];

        return this.productsRepository.find({
            where: {
                ...(Object.hasOwn(queryFilter || {}, 'isActive') && {
                    isActive: Boolean(queryFilter?.isActive),
                }),
                ...(Boolean(categories.length) && {
                    category: {
                        id: In(categories),
                    },
                }),
            },
        });
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
}
