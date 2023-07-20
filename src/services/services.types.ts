import { Field, ObjectType } from "@nestjs/graphql";
import { Service } from "./service.entity";
import { ServicePromotion } from "../service-promotion/service-promotion.entity";


@ObjectType()
export class serviceType extends Service {
    @Field({ nullable: true })
    percent: number

    @Field(() => ServicePromotion, { nullable: true })
    servicePromotion: ServicePromotion
}

@ObjectType()
export class getServicesType {
    @Field(() => [Service])
    services: Service[]

    @Field()
    totalPage: number
}