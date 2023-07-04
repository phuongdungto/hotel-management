import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class getUsersType<T> {
    @Field()
    users: T[]

    @Field()
    totalPage: number
}