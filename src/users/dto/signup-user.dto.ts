import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserSignInDto } from './signin-user.dto';

export class UserSignupDto extends UserSignInDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name Should be String' })
  username: string;

  // @IsNotEmpty({ message: 'Email is required' })
  // @IsEmail({}, { message: 'Please Provide a valid email address' })
  // email: string;

  // @IsNotEmpty({ message: 'Password is required' })
  // @MinLength(5, { message: 'Password Should be at least 5 characters' })
  // password: string;
}
