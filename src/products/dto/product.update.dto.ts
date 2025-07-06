import { PartialType } from "@nestjs/mapped-types";
import { ProductCreateDTO } from "./product.create.dto";
import { IsNumber } from "class-validator";

export class ProductUpdateDTO extends PartialType(ProductCreateDTO) {
    @IsNumber()
    id: number;
}