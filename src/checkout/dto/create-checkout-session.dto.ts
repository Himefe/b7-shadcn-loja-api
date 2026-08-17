import { ArrayMinSize, IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';

export class CheckoutItemDto {
    @IsString()
    id!: string;

    @IsInt()
    @Min(1)
    quantity!: number;
}

export class CreateCheckoutSessionDto {
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CheckoutItemDto)
    products!: CheckoutItemDto[];

    @IsString()
    userName!: string;
}
