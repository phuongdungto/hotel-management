import { Injectable, ExecutionContext, CanActivate, UnauthorizedException } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from "@nestjs/graphql";
import { usersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from "dotenv";
import { ReqUser } from '../users/interfaces/user.interface';
dotenv.config();


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService
    ) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const ctx = GqlExecutionContext.create(context).getContext();
            const token = ctx.req.headers.authorization;
            if (!token || !token.startsWith('Bearer')) {
                throw new UnauthorizedException('Token schema is invalid or missing');
            };

            const accessToken = token.replace('Bearer ', '');

            const user = await this.jwtService.verifyAsync(
                accessToken,
                {
                    secret: process.env.JWT_SECRET
                }
            ) as ReqUser;
            ctx.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}