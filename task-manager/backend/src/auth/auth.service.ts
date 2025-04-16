import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO, LoginDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(authDetails: RegisterDTO): Promise<User> {
    try {
      const isUserAlreadyExists = await this.userRepository.findOne({
        where: { email: authDetails.email },
      });
      if (!isUserAlreadyExists) {
        throw new ConflictException(
          `User with this email: ${authDetails.email} already exists!`,
        );
      }
      const newUser = this.userRepository.create(authDetails);
      await newUser.hashPassword();
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException(`Error while creating user!`);
    }
  }

  async loginUser(loginDetails: LoginDTO): Promise<string> {
    try {
      const isUserExists = await this.userRepository.findOne({
        where: { email: loginDetails.email },
      });
      if (!isUserExists) {
        throw new NotFoundException(
          `user not found. Please try again with another email.`,
        );
      }
      const isPasswordMatched = await bcrypt.compare(
        loginDetails.password,
        isUserExists.password,
      );
      if (!isPasswordMatched) {
        throw new ConflictException(`Invalid password, Please try Again.`);
      }
      return this.jwtService.sign({
        id: isUserExists.id,
        email: isUserExists.email,
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error while login user`);
    }
  }
}
