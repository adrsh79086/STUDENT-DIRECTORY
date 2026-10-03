import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/Signup.Dto';
import { LoginDto } from './dto/login.Dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Req() request: Request) {
  return {
    message: 'You can access this protected route',
    user: request['user'],
  };
}
}