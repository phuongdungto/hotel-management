import { Field, ObjectType } from "@nestjs/graphql";
import { userType } from "../users/users.types";

@ObjectType()
export class signinType extends userType {
    @Field()
    accessToken: string
}