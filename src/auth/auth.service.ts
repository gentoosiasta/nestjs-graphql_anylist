import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';

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
}
