import { Field, ObjectType } from "@nestjs/graphql";
import { Service } from "./service.entity";
import { ServicePromotion } from "../service-promotion/service-promotion.entity";


@ObjectType()
export class serviceType extends Service {
    @Field({ nullable: true })
    percent: number

    @Field({ nullable: true })
    servicePromotion: string
}

@ObjectType()
export class getServicesType {
    @Field(() => [serviceType])
    services: serviceType[]

    @Field()
    totalPage: number
}