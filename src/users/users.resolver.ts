import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { Req, UseGuards } from "@nestjs/common/decorators";
import { userType } from "./users.types";
import { usersService } from "./users.service";
import { User } from "./users.entity";
import { createUserInput } from "./users.input";
import { Role } from "../decorators/roles.decorator";
import { Roles } from "../core/enum";
import { AuthGuard } from "../auth/auth.guard";
import { Request } from "express";
import { ReqUser } from "./interfaces/user.interface";
import { RolesGuard } from "../auth/role.guard";

@Resolver()
export class userResolver {
    constructor(
        private userService: usersService
    ) { }

    @Query(returns => userType)
    async getUser(@Args('id') id: string): Promise<User> {

        return await this.userService.getUser(id);
    }

    @Mutation(returns => userType)
    @UseGuards(AuthGuard, new RolesGuard([Roles.ADMIN, Roles.MANAGER]))
    async createUser(@Args('createUserInput') input: createUserInput, @Context("user") user: ReqUser): Promise<User> {
        return await this.userService.createUser(input);
    }
}