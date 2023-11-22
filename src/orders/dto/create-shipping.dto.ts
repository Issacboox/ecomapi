import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateShippingDto {
  @IsNotEmpty({
    message: 'Please Provide Phone number We might need to contact you',
  })
  @IsString({ message: 'Phone number Should be String' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'Name should be String' })
  name: string;

  @IsNotEmpty({ message: 'Please Provide You address' })
  @IsString({ message: 'Address Should be String' })
  address: string;

  @IsOptional()
  @IsString({ message: 'Info should be String' })
  more_info_address: string;
}
