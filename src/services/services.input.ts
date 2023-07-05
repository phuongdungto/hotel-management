import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { FilterPagination } from "../core/interfaces/fiter.interface";

@InputType()
export class createServiceInput {
    @Field()
    @IsString()
    name: string

    @Field()
    @IsNumber()
    price: number
}

@InputType()
export class updateServiceInput {
    @IsUUID()
    @IsString()
    @Field()
    id: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    name: string

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    price: number
}

@InputType()
export class getServicesInput implements FilterPagination {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    name: string

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    price: number

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