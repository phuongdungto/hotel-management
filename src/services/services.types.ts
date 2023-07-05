import { Field, ObjectType } from "@nestjs/graphql";
import { Service } from "./service.entity";


@ObjectType()
export class getServicesType {
    @Field(() => [Service])
    services: Service[]

    @Field()
    totalPage: number
}