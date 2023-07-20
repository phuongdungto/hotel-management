import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsEnum, IsNumberString, IsOptional, IsString, IsUUID, Length, Max, MaxLength, MinLength } from "class-validator";
import { Gender } from "../core/enum";
import { FilterPagination } from "../core/interfaces/fiter.interface";

@InputType()
export class createCustomerIput {

    @Field()
    @IsNumberString()
    @Length(12)
    nationalId: string

    @Field()
    @IsString()
    firstname: string;

    @Field()
    @IsString()
    lastname: string;

    @Field()
    @IsNumberString()
    @MaxLength(12)
    @MinLength(10)
    numberPhone: string;

    @Field()
    @IsString()
    @MinLength(10)
    address: string;

    @Field()
    @IsDate()
    birthday: Date;

    @Field()
    @IsEnum(Gender)
    gender: string;
}

@InputType()
export class updateCustomerInput {
    @Field()
    @IsString()
    @IsUUID()
    id: string

    @Field({ nullable: true })
    @IsNumberString()
    @Length(12)
    @IsOptional()
    nationalId: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    firstname: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    lastname: string;

    @Field({ nullable: true })
    @IsNumberString()
    @MaxLength(12)
    @MinLength(10)
    @IsOptional()
    numberPhone: string;

    @Field({ nullable: true })
    @IsString()
    @MinLength(10)
    @IsOptional()
    address: string;

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    birthday: Date;

    @Field({ nullable: true })
    @IsEnum(Gender)
    @IsOptional()
    gender: string;
}

@InputType()
export class getCustomersInput implements FilterPagination {

    @Field({ nullable: true })
    @IsNumberString()
    @Length(12)
    @IsOptional()
    nationalId: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    firstname: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    lastname: string;

    @Field({ nullable: true })
    @IsNumberString()
    @MaxLength(12)
    @MinLength(10)
    @IsOptional()
    numberPhone: string;

    @Field({ nullable: true })
    @IsString()
    @MinLength(10)
    @IsOptional()
    address: string;

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    birthday: Date;

    @Field({ nullable: true })
    @IsEnum(Gender)
    @IsOptional()
    gender: string;

    @IsOptional()
    @Field({ nullable: true })
    page: number

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