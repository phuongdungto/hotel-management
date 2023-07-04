import { Field, ObjectType } from "@nestjs/graphql";
import { Customer } from "./customers.entity";

@ObjectType()
export class customerType {
    @Field()
    id: string

    @Field()
    nationalId: string

    @Field()
    firstname: string;

    @Field()
    lastname: string;

    @Field()
    numberPhone: string;

    @Field()
    address: string;

    @Field()
    birthday: Date;

    @Field()
    gender: string;
}

@ObjectType()
export class getCustomersType {
    @Field(() => [Customer])
    customers: Customer[]

    @Field()
    totalPage: number
}