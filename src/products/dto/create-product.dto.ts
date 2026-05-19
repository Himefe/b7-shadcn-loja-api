import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name!: string;

    @IsNumber()
    price!: number;

    @IsOptional()
    @IsNumber()
    id_category?: number;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
