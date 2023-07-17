import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { FilterPagination } from "../core/interfaces/fiter.interface";
import { RoomPromotionDetails } from "../room-promotion-detail/room-promotion-detail.entity";
import { roomPromotionDetailType } from "src/room-promotion-detail/room-promotion-detail.input";


@InputType()
export class createRoomPromotionInput {
    @Field()
    @IsDate()
    dateStart: Date;

    @Field()
    @IsDate()
    dateEnd: Date;

    @Field()
    @IsString()
    name: string;

    @Field()
    @IsNumber()
    percent: number;

    @Field(() => [roomPromotionDetailType], { nullable: true })
    @IsArray()
    @IsOptional()
    roomPromotionDetails: roomPromotionDetailType[]
}

@InputType()
export class updateRoomPromotionInput {
    @IsUUID()
    @IsString()
    @Field()
    id: string

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    dateStart: Date;

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    dateEnd: Date;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    name: string;

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    percent: number;

    @Field(() => [roomPromotionDetailType], { nullable: true })
    @IsArray()
    @IsOptional()
    roomPromotionDetails: roomPromotionDetailType[]
}

@InputType()
export class getRoomPromotionsInput implements FilterPagination {
    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    dateStart: Date;

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    dateEnd: Date;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    name: string;

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    percent: number;

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