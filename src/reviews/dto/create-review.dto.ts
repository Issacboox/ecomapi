import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty({message:"Product Should not be empty"})
    @IsNumber({},{message:"Product Should be Number !"})
    productId: number;

    @IsNotEmpty({message:"Rating Should not be empty"})
    @IsNumber({},{message:"Rating Should be Number !"})
    rating: number;

    @IsNotEmpty({message:"Comment Should not be empty"})
    @IsString({message:"Comment Should be string"})
    comment: string;
}
