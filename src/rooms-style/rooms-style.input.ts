import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { FilterPagination } from "../core/interfaces/fiter.interface";

@InputType()
export class createRoomStypeInput {
    @IsString()
    @Field()
    name: string
}

@InputType()
export class updateRoomStyleInput {
    @IsUUID()
    @IsString()
    @Field()
    id: string

    @IsString()
    @Field()
    name: string
}

@InputType()
export class getRoomStylesInput implements FilterPagination {
    @IsString()
    @Field({ nullable: true })
    @IsOptional()
    name: string

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