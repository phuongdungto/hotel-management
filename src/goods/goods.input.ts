import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { FilterPagination } from "../core/interfaces/fiter.interface";

@InputType()
export class createGoodsInput {
    @Field()
    @IsString()
    name: string;

    @Field()
    @IsString()
    type: string;


    @Field()
    @IsNumber()
    numberOfGoods: number;

    @Field()
    @IsNumber()
    pirce: number;
}

@InputType()
export class updateGoodsInput {
    @Field()
    @IsString()
    @IsUUID()
    id: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    name: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    type: string;


    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    numberOfGoods: number;

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    pirce: number;
}

@InputType()
export class getGoodsListInput implements FilterPagination {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    name: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    type: string;


    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    numberOfGoods: number;

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    pirce: number;

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