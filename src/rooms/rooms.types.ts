import { Field, ObjectType } from "@nestjs/graphql";
import { Rooms } from "./rooms.entity";
import { RoomPromotion } from "../room-promotion/room-promotion.entity";

@ObjectType()
export class roomType extends Rooms {
    @Field()
    percent: number

    @Field(() => RoomPromotion, { nullable: true })
    roomPromotion: RoomPromotion
}

@ObjectType()
export class getRoomsType {
    @Field(() => [roomType])
    rooms: roomType[]

    @Field()
    totalPage: number
}