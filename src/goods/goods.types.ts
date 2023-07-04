import { Field, ObjectType } from "@nestjs/graphql";
import { Goods } from "./goods.entity";

@ObjectType()
export class goodsType {
    @Field()
    id: string

    @Field()
    name: string;

    @Field()
    type: string;

    @Field()
    numberOfGoods: number;

    @Field()
    pirce: number;
}

@ObjectType()
export class getGoodsListType {
    @Field(() => [Goods])
    goods: Goods[]

    @Field()
    totalPage: number
}