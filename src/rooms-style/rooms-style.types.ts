import { Field, ObjectType } from "@nestjs/graphql";
import { baseType } from "../core/extends/base.types";
import { RoomsStyle } from "./room-style.entity";

@ObjectType()
export class getRoomStylesType {
    @Field(() => [RoomsStyle])
    roomStyles: RoomsStyle[]

    @Field()
    totalPage: number
}