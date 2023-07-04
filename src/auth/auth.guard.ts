import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from '@nestjs/jwt';
import { ReqUser } from '../users/interfaces/user.interface';
import { AuthenticationError } from 'apollo-server-express'

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
                throw new AuthenticationError('Token schema is invalid or missing');
            };

            const accessToken = token.replace('Bearer ', '');

            const user = await this.jwtService.verifyAsync(
                accessToken,
                {
                    secret: process.env.JWT_SECRET
                }
            ) as ReqUser;
            ctx.user = user;
        } catch (error) {
            throw new AuthenticationError(error);
        }
        return true;
    }
}