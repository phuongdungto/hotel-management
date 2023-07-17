import { Field, ObjectType } from "@nestjs/graphql";
import { RoomPromotion } from "./room-promotion.entity";


@ObjectType()
export class getRoomPromotionsType {
  @Field(() => [RoomPromotion])
  roomPromotions: RoomPromotion[]

  @Field()
  totalPage: number
}