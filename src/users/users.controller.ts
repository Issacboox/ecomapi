import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignupDto } from './dto/signup-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/signin-user.dto';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() userSignUp: UserSignupDto): Promise<UserEntity> {
    return await this.usersService.signup(userSignUp);
  }

  @Post('signin')
  async signin(@Body() userSignIn: UserSignInDto): Promise<{
    accessToken: string;
    user: UserEntity;
  }> {
    const user = await this.usersService.signin(userSignIn);
    const accessToken = await this.usersService.accessToken(user);
    return { accessToken, user };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // return this.usersService.create(createUserDto);
    return 'This action adds a new user';
  }

  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('user/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('me')
  getMe(@CurrentUser() currentUser: UserEntity) {
    return currentUser;
  }
}
