import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { FilterPagination } from "../core/interfaces/fiter.interface";


@InputType()
export class createProviderInput {
    @Field()
    @IsString()
    name: string

    @Field()
    @IsString()
    @MinLength(10)
    address: string

    @Field()
    @IsNumberString()
    @MaxLength(12)
    @MinLength(8)
    numberPhone: string
}

@InputType()
export class updateProviderInput {
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    name: string

    @IsString()
    @MinLength(10)
    @IsOptional()
    @Field({ nullable: true })
    address: string

    @IsNumberString()
    @IsOptional()
    @MinLength(8)
    @MaxLength(12)
    @Field({ nullable: true })
    numberPhone: string
}

@InputType()
export class getProvidersInput implements FilterPagination {
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    name: string

    @IsString()
    @MinLength(10)
    @IsOptional()
    @Field({ nullable: true })
    address: string

    @IsNumberString()
    @IsOptional()
    @MinLength(8)
    @MaxLength(12)
    @Field({ nullable: true })
    numberPhone: string

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