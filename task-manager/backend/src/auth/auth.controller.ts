import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  createUser(@Body() authDetails: AuthDto) {
    return this.authService.createUser(authDetails);
  }

  @Post('/login')
  loginUser(@Body() loginDetails: LoginDto) {
    return this.authService.loginUser(loginDetails);
  }
}
