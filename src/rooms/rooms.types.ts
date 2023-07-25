import { Field, ObjectType } from "@nestjs/graphql";
import { Rooms } from "./rooms.entity";

@ObjectType()
export class roomType extends Rooms {
    @Field()
    percent: number

    @Field({ nullable: true })
    roomPromotion: string
}

@ObjectType()
export class getRoomsType {
    @Field(() => [roomType])
    rooms: roomType[]

    @Field()
    totalPage: number
}