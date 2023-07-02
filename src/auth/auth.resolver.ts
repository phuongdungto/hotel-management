import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { signinInput } from './auth.input';
import { signinType } from './auth.types';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(
        private authService: AuthService
    ) { }

    @Mutation(returns => signinType)
    async signin(@Args('signinInput') input: signinInput): Promise<signinType> {
        return await this.authService.signin(input)
    }
}
