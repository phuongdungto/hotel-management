import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { roomReservationDetailsType } from "../room-reservation-detail/room-reservation-detail.input";
import { FilterPagination } from "../core/interfaces/fiter.interface";


@InputType()
export class createRoomReservationInput {
    @Field()
    @IsNumber()
    numberOfRoom: number;

    @Field()
    @IsDate()
    checkIn: Date;

    @Field()
    @IsDate()
    checkOut: Date;

    @Field()
    @IsString()
    @IsUUID()
    customerId: string

    @Field(() => [roomReservationDetailsType])
    @IsArray()
    roomReservationDetails: roomReservationDetailsType[];
}

@InputType()
export class updateRoomReservationInput {
    @IsUUID()
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    id: string

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    numberOfRoom: number;

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    checkIn: Date;

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    checkOut: Date;

    @Field({ nullable: true })
    @IsString()
    @IsUUID()
    @IsOptional()
    customerId: string

    @Field(() => [roomReservationDetailsType], { nullable: true })
    @IsArray()
    @IsOptional()
    roomReservationDetails: roomReservationDetailsType[];
}

@InputType()
export class getRoomReservationsInput implements FilterPagination {
    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    numberOfRoom: number;

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    checkIn: Date;

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    checkOut: Date;

    @Field({ nullable: true })
    @IsString()
    @IsUUID()
    @IsOptional()
    customerId: string

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



