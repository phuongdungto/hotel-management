import { Field, ObjectType } from "@nestjs/graphql"
import { ServicePromotion } from "./service-promotion.entity"

@ObjectType()
export class getServicePromotionsType {
    @Field(() => [ServicePromotion])
    servicePromotions: ServicePromotion[]

    @Field()
    totalPage: number
}