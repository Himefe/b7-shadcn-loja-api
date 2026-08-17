import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { HttpQueryFilter } from '../types/query';
import { CategoryType } from './enums/category-type.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) {}

    create(createCategoryDto: CreateCategoryDto) {
        console.log(createCategoryDto);
        return 'This action adds a new category';
    }

    findAll(queryFilter?: HttpQueryFilter['filter']) {
        const typeFilter = Array.isArray(queryFilter?.type) ? queryFilter.type : [queryFilter?.type];
        const categoryTypes = typeFilter.filter((type): type is CategoryType => {
            return Boolean(type) && Object.values(CategoryType).includes(type);
        });

        return this.categoriesRepository.find({
            ...(Boolean(categoryTypes.length) && {
                where: {
                    type: In(categoryTypes),
                },
            }),
        });
    }

    findOne(id: number) {
        return `This action returns a #${id} category`;
    }

    update(id: number, updateCategoryDto: UpdateCategoryDto) {
        console.log(updateCategoryDto);
        return `This action updates a #${id} category`;
    }

    remove(id: number) {
        return `This action removes a #${id} category`;
    }
}
