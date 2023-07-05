import { Field, ObjectType } from "@nestjs/graphql";
import { Customer } from "./customers.entity";

@ObjectType()
export class getCustomersType {
    @Field(() => [Customer])
    customers: Customer[]

    @Field()
    totalPage: number
}