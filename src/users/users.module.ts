import { Module } from '@nestjs/common';
import { userResolver } from './users.resolver';
import { usersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from "dotenv";
import { PassportModule } from '@nestjs/passport';
dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        userResolver, usersService
    ],
    exports: [usersService]
})
export class UsersModule { }
