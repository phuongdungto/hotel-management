import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNumber, IsNumberString, IsOptional, IsString, IsUUID } from "class-validator";
import { RoomStatus } from "../core/enum";
import { FilterPagination } from "src/core/interfaces/fiter.interface";

@InputType()
export class createRoomInput {
    @Field()
    @IsString()
    name: string

    @Field()
    @IsNumber()
    floor: number

    @Field()
    @IsNumber()
    numberOfPeople: number

    @Field()
    @IsNumber()
    price: number

    @Field({ nullable: true })
    @IsEnum(RoomStatus)
    @IsOptional()
    status: string

    @Field()
    @IsString()
    @IsUUID()
    roomStyleId: string

    constructor(status: string) {
        this.status = RoomStatus.AVAILABLE;
    }
}

@InputType()
export class updateRoomInput {
    @Field()
    @IsString()
    @IsUUID()
    id: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    name: string

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    floor: number

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    numberOfPeople: number

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    price: number

    @Field({ nullable: true })
    @IsEnum(RoomStatus)
    @IsOptional()
    @IsOptional()
    status: string

    @Field({ nullable: true })
    @IsString()
    @IsUUID()
    @IsOptional()
    roomStyleId: string
}

@InputType()
export class getRoomsInput implements FilterPagination {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    name: string

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    floor: number

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    numberOfPeople: number

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    price: number

    @Field(() => [String], { nullable: true })
    @IsEnum(RoomStatus, { each: true })
    @IsOptional()
    status: string[]

    @Field({ nullable: true })
    @IsString()
    @IsUUID()
    @IsOptional()
    roomStyleId: string

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