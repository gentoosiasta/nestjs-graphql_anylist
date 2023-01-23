import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup' })
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<AuthResponse> {
    return this.authService.signup(signupInput);
  }

  // @Mutation(/** */ ??? */, {name: 'signin'})
  // signin(/** ??? */): Promise</** ??? */> { return this.authService.signin(/** ??? */)}

  // @Query(/** ??? */, {name: revalidate})
  // revalidateToken() {return this.authService.revalidateToken(/** ??? */)}
}
