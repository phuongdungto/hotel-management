import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsDate, IsEnum, IsNumber, IsNumberString, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { Gender, Roles } from '../core/enum';
import { FilterPagination } from '../core/interfaces/fiter.interface';

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
export class updateUserInput {
    @Field({ nullable: true })
    @IsNumberString()
    @Length(12)
    @IsOptional()
    nationalId?: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    firstname?: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    lastname?: string

    @IsEnum(Roles)
    @IsOptional()
    @Field({ nullable: true })
    role?: string

    @IsEnum(Gender)
    @IsOptional()
    @Field({ nullable: true })
    gender?: string

    @IsNumber()
    @IsOptional()
    @Field({ nullable: true })
    salary?: number

    @IsNumberString()
    @MinLength(10)
    @MaxLength(12)
    @IsOptional()
    @Field({ nullable: true })
    numberPhone?: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    address?: string;

    @IsDate()
    @IsOptional()
    @Field({ nullable: true })
    birthday?: Date;
}

@InputType()
export class getUsersInput implements FilterPagination {
    @Field({ nullable: true })
    @IsString()
    @MinLength(12)
    @IsOptional()
    nationalId: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    fullname: string

    @IsArray()
    @IsEnum(Roles, { each: true })
    @IsOptional()
    @Field(() => [String], { nullable: true })
    role: string[]

    @IsString()
    @IsOptional()
    @MinLength(8)
    @Field({ nullable: true })
    username?: string

    @IsOptional()
    @IsOptional()
    @Field({ nullable: true })
    page: number

    @IsOptional()
    @IsOptional()
    @Field({ nullable: true })
    limit: number

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    sort: string

    @IsEnum(['desc', 'asc'])
    @IsOptional()
    @Field({ nullable: true })
    sortBy: string

    constructor() {
        this.page = 1;
        this.limit = 5
    }
}