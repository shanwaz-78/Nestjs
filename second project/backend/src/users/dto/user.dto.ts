import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

class AuthCredentialsDto {
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @IsEmail({}, { message: 'Provide a valid email.' })
  email!: string;

  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @IsString({ message: 'Password must be a string.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password!: string;
}

class RegisterUserDto extends AuthCredentialsDto {
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @IsString({ message: 'Name must be a string.' })
  name!: string;
}

class LoginDto extends AuthCredentialsDto {}

export { RegisterUserDto, LoginDto };
