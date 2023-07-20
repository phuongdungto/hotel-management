import { Field, ObjectType } from "@nestjs/graphql";
import { BillDetail } from "./bill-detail.entity";
import { ServicePromotion } from "../service-promotion/service-promotion.entity";
import { Service } from "../services/service.entity";
import { Bill } from "../bills/bills.entity";
import { serviceType } from "../services/services.types";

@ObjectType()
export class billDetailType extends BillDetail {
    @Field(() => serviceType)
    service: serviceType

    @Field(() => Bill)
    bill: Bill
}