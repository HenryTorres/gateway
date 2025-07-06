import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class ProductCreateDTO {
    @IsString()
    name: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Type(() => Number)
    price: number;
}