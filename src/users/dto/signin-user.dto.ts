import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserSignInDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please Provide a valid email address' })
    email: string;
  
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(5, { message: 'Password Should be at least 5 characters' })
    password: string;
}