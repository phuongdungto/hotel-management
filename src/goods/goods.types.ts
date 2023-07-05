import { Field, ObjectType } from "@nestjs/graphql";
import { Goods } from "./goods.entity";

@ObjectType()
export class getGoodsListType {
    @Field(() => [Goods])
    goods: Goods[]

    @Field()
    totalPage: number
}