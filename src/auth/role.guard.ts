import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../core/enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

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
            throw new ForbiddenException('Forbidden accessible');
        }
        return true;
    }
}