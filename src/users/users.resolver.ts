import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common/decorators";
import { getUsersType, userType } from "./users.types";
import { usersService } from "./users.service";
import { User } from "./users.entity";
import { createUserInput, getUsersInput, updateUserInput } from "./users.input";
import { Roles } from "../core/enum";
import { AuthGuard } from "../auth/auth.guard";
import { ReqUser } from "./interfaces/user.interface";
import { RolesGuard } from "../auth/role.guard";
import { responseUntil } from "src/core/utils/response.utils";

@Resolver()
export class userResolver {
    constructor(
        private userService: usersService
    ) { }

    @Query(returns => userType)
    @UseGuards(AuthGuard)
    async getUser(@Args('id') id: string): Promise<User> {

        return await this.userService.getUser(id);
    }

    @Query(returns => getUsersType)
    @UseGuards(AuthGuard)
    async getUsers(@Args('getUsersInput') input: getUsersInput, @Context('user') user: ReqUser): Promise<getUsersType> {
        return await this.userService.getUsers(input);
    }

    @Mutation(returns => userType)
    @UseGuards(AuthGuard, new RolesGuard([Roles.ADMIN, Roles.MANAGER]))
    async createUser(@Args('createUserInput') input: createUserInput, @Context("user") user: ReqUser): Promise<User> {
        return await this.userService.createUser(input);
    }

    @Mutation(returns => userType)
    @UseGuards(AuthGuard, new RolesGuard([Roles.ADMIN, Roles.MANAGER, Roles.STAFF]))
    async updateUser(@Args('id') id: string, @Args('updateUserInput') input: updateUserInput, @Context("user") user: ReqUser): Promise<User> {
        return await this.userService.updateUser(id, input)
    }

    @Mutation(returns => responseUntil)
    @UseGuards(AuthGuard, new RolesGuard([Roles.ADMIN, Roles.MANAGER, Roles.STAFF]))
    async deleteUser(@Args('id') id: string): Promise<responseUntil> {
        await this.userService.deleteUser(id);

        return {
            code: "SUCESS",
            message: "deleted user successfull",
        }
    }

}