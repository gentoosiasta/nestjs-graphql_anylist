import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SigninInput, SignupInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput);
    //Todo: Create JWT
    const token = 'ABC123';

    return {
      token,
      user,
    };
  }

  async signin(signinInput: SigninInput): Promise<AuthResponse> {
    const { email, password } = signinInput;
    const user = await this.usersService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Email or Password do not match');
    }
    //Todo: JWT
    const token = 'ABC123';

    return {
      token,
      user,
    };
  }
}
