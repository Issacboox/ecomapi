import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Title can not be empty' })
  @IsString({ message: 'Title should be a string' })
  title: string;

  @IsNotEmpty({ message: 'Description can not be empty' })
  @IsString({ message: 'Description should be a string' })
  description: string;

  @IsNotEmpty({ message: 'Price can not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price should be number & max decimal places is 2' },
  )
  @IsPositive({ message: 'Price should be Positive number' })
  price: number;

  @IsNotEmpty({ message: 'Unit Sale can not be empty' })
  @IsString({ message: 'unit sale should be a string' })
  unit_sale:string;

  @IsNotEmpty({ message: 'Stock can not be empty' })
  @IsNumber({}, { message: 'Stock should be number' })
  @Min(0, { message: 'Stock can not be negative' })
  stock: number;

  @IsNotEmpty({ message: 'Images can not be empty' })
  @IsArray({ message: 'Images should be in a array format' })
  images: string[];

  @IsNotEmpty({ message: 'Category can not be empty' })
  @IsNumber({}, { message: 'Category Should be number' })
  category: number;
}
