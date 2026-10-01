import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bycrypt from 'bcrypt';

import { userService } from 'src/user/user.service';
import { LoginDto } from './dto/login.Dto';
import { RegisterDto } from './dto/Signup.Dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: userService,
    private readonly jwtService: JwtService,
  ) {}

  //register

    async register(registerdto: RegisterDto) {
  try {
    const existingUser = await this.userService.findbyEmail(
      registerdto.email,
    );

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const hashpass = await bycrypt.hash(
      registerdto.password,
      10,
    );

    const user = await this.userService.create({
      name: registerdto.name,
      email: registerdto.email,
      password: hashpass, // ✅ hashed password
    });

    return {
      message: 'User registered successfully',
    };

  } catch (error) {
    if (
      error instanceof ConflictException ||
      error instanceof UnauthorizedException
    ) {
      throw error;
    }

    throw new InternalServerErrorException(
      'Something went wrong',
    );
  }
}
//login
     async login(logindto: LoginDto) {
  try {
    const user = await this.userService.findbyEmail(
      logindto.email,
    );


    if (!user) {
      throw new UnauthorizedException(
        'invalid user or password',
      );
    }

    const isPasswordvalid = await bycrypt.compare(
      logindto.password,
      user.password,
    );
   if (!isPasswordvalid) {
      throw new UnauthorizedException(
        'invalid credentials',
      );
    }
    const payload = {
      sub: user._id.toString(),
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      message: 'Login successful',
      access_token: accessToken,
    };

  } catch (error) {
    console.error('LOGIN ERROR:', error);

    if (error instanceof UnauthorizedException) {
      throw error;
    }

    throw new InternalServerErrorException(
      'Failed to login',
    );
  }
}





}
