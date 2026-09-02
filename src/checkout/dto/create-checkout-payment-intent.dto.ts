import { ArrayMinSize, IsArray, IsInt, IsObject, IsString, Min, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';

export class CheckoutItemDto {
    @IsString()
    id!: string;

    @IsInt()
    @Min(1)
    quantity!: number;
}

export class CreateCheckoutPaymentIntentDto {
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CheckoutItemDto)
    products!: CheckoutItemDto[];

    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => Object)
    user!: {
        name: string;
        email: string;
    };
}
