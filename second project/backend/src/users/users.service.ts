import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDto, RegisterUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(RegisterEntity)
    private readonly userRepository: Repository<RegisterEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(
    userDetails: RegisterUserDto,
  ): Promise<Omit<RegisterEntity, 'password'>> {
    const { name, email, password } = userDetails;

    const isUserAlreadyExists = await this.userRepository.findOne({
      where: { email },
    });

    if (isUserAlreadyExists) {
      throw new ConflictException('User with this email already exists.');
    }

    const saltRounds = parseInt(process.env.SALT_OF_ROUNDS || '10', 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    try {
      const savedUser = await this.userRepository.save(newUser);

      const { password, ...userWithoutPassword } = savedUser;
      return userWithoutPassword;
    } catch (error) {
      throw new InternalServerErrorException('Error saving user to database');
    }
  }

  async loginUser(loginDetails: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDetails;
    const isUserRegistered = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
    if (!isUserRegistered) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserRegistered.password,
    );
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const payload = {
      userId: isUserRegistered.id,
      email: isUserRegistered.email,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
