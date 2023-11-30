import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignupDto } from './dto/signup-user.dto';
import { compare, hash } from 'bcrypt';
import { UserSignInDto } from './dto/signin-user.dto';
import { sign } from 'jsonwebtoken';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignUp: UserSignupDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(userSignUp.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    userSignUp.password = await hash(userSignUp.password, 10);
    const user = this.usersRepository.create(userSignUp);
    return await this.usersRepository.save(user);
  }

  async signin(userSignIn: UserSignInDto): Promise<UserEntity> {
    const userExists = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userSignIn.email })
      .getOne();
      
    if (!userExists) {
      throw new BadRequestException('User not found');
    }
    const matchPassword = await compare(
      userSignIn.password,
      userExists.password,
    );
    if (!matchPassword) {
      throw new BadRequestException('Invalid password');
    }
    delete userExists.password;
    return userExists;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity>{
    const user = await this.usersRepository.findOneBy({id});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async accessToken(user: UserEntity): Promise<string> {
    return sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_SECRET_KEY_EXPIRE },
    );
  }
}
