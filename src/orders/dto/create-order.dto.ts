import { IsNotEmpty, IsNumber, IsPositive, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { CreateShippingDto } from "./create-shipping.dto"
import { OrderProductDto } from "./order-detail.dto"

export class CreateOrderDto {
    @Type(()=> CreateShippingDto)
    @ValidateNested()
    shippingAddress: CreateShippingDto

    @Type(()=> OrderProductDto)
    @ValidateNested()
    orderedProduct:OrderProductDto[];
}
