import { IsNotEmpty, IsNumber, IsPositive } from "class-validator"

export class OrderProductDto{
    @IsNotEmpty({message:"is should not be empty"})
    id:number

    @IsNumber({maxDecimalPlaces:2},{message:"Price Should be number && Max decimal places is 2"}) 
    @IsPositive({message:"Price can not be Negative"})
    product_unit_price:number

    @IsNumber({},{message:"Quantity Should be number"}) 
    @IsPositive({message:"Quantity can not be Negative"})
    product_quantity:number

}