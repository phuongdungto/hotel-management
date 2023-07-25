import { Field, ObjectType } from "@nestjs/graphql";
import { PurchasesOrder } from "./purchase-order.entity";

@ObjectType()
export class getPurchaseOdersType {
    @Field()
    totalPage: number

    @Field(() => [PurchasesOrder])
    purchaseOrders: PurchasesOrder[]
}