import { Field, ObjectType } from "@nestjs/graphql";
import { Rooms } from "./rooms.entity";


@ObjectType()
export class getRoomsType {
    @Field(() => [Rooms])
    rooms: Rooms[]

    @Field()
    totalPage: number
}