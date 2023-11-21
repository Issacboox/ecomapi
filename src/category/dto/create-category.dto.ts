import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title should be string' })
    title: string;

    @IsNotEmpty({ message: 'Description is required' })
    @IsString({ message: 'Description should be string' })
    description: string;
}
