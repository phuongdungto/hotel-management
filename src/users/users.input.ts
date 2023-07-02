import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsEnum, IsNumber, IsNumberString, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { Gender, Roles } from '../core/enum';

@InputType()
export class createUserInput {
    @Field()
    @IsNumberString()
    @Length(12)
    nationalId: string

    @Field()
    @IsString()
    firstname: string

    @Field()
    @IsString()
    lastname: string

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

    @IsEnum(Gender)
    @Field()
    gender: string

    @IsNumber()
    @Field()
    salary: number

    @IsNumberString()
    @MinLength(10)
    @MaxLength(12)
    @Field()
    numberPhone: string;

    @IsString()
    @Field()
    address: string;

    @IsDate()
    @Field()
    birthday: Date;
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