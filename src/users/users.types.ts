import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class userType {
    @Field()
    id: string

    @Field()
    nationalId: string

    @Field()
    firstname: string

    @Field()
    lastname: string

    @Field()
    gender: string

    @Field()
    salary: number

    @Field()
    numberPhone: string;

    @Field()
    address: string;

    @Field()
    birthday: string;

    @Field()
    role: string

    @Field()
    username: string

    @Field()
    createdAt: string

    @Field()
    updatedAt: string

    @Field()
    deletedAt: string
}