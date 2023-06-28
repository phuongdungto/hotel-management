import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsString, MinLength } from 'class-validator';
import { Roles } from '../core/enum';

@InputType()
export class createUserInput {
    @Field()
    @IsString()
    @MinLength(12)
    nationalIDCard: string

    @Field()
    @IsString()
    fullname: string

    @IsEnum(Roles)
    @Field()
    role: string

    @IsString()
    @MinLength(8)
    @Field()
    username: string

    @IsString()
    @MinLength(8)
    @Field()
    password: string
}

@InputType()
export class getUsersInput {
    @Field()
    @IsString()
    @MinLength(12)
    nationalIDCard?: string

    @Field()
    @IsString()
    fullname?: string

    @IsEnum(Roles)
    @Field()
    role?: string

    @IsString()
    @MinLength(8)
    @Field()
    username?: string
}