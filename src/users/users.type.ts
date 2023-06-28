import { ObjectType, Field, ID, ArgsType } from "@nestjs/graphql";

@ObjectType()
export class userType {
    @Field()
    id: string

    @Field()
    nationalIDCard: string

    @Field()
    fullname: string

    @Field()
    role: string

    @Field()
    username: string

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field()
    deletedAt: Date
}