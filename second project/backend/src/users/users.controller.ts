import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto, RegisterUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/add-user')
  createUser(@Body() userDetails: RegisterUserDto) {
    return this.usersService.createUser(userDetails);
  }

  @Post('/login-user')
  loginUser(@Body() loginDetails: LoginDto) {
    return this.usersService.loginUser(loginDetails);
  }
}
