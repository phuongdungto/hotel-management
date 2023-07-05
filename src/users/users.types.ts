import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "./users.entity";

@ObjectType()
export class getUsersType {
    @Field(() => [User])
    users: User[]

    @Field()
    totalPage: number
}