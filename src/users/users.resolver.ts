import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { userType } from "./users.type";
import { usersService } from "./users.service";
import { User } from "./users.entity";
import { createUserInput } from "./users.input";

@Resolver(of => userType)
export class userResolver {
    constructor(
        private userService: usersService
    ) { }

    @Query(returns => userType)
    async getUser(@Args('id') id: string): Promise<User> {

        return await this.userService.getUser(id);
    }

    @Mutation(returns => userType)
    async createUser(@Args('createUserInput') input: createUserInput): Promise<User> {
        try {
            return await this.userService.createUser(input);
        } catch (error) {
            console.log(error)
        }
    }
}