import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Roles } from '../core/enum';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ForbiddenError } from 'apollo-server-express';

@Injectable()
export class RolesGuard implements CanActivate {
    private roles: Roles[]
    constructor(roles: Roles[]) {
        this.roles = roles;
    }

    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context).getContext();
        const { role } = ctx.user;
        if (this.roles.length && !this.roles.some((roles) => roles === role)) {
            throw new ForbiddenError('Forbidden accessible');
        }
        return true;
    }
}