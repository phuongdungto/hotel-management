import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../users/users.entity";

@ObjectType()
export class signinType extends User {
    @Field()
    accessToken: string
}