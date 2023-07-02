import { Field, InputType } from "@nestjs/graphql"
import { IsString, MinLength } from "class-validator"

@InputType()
export class signinInput {
    @IsString()
    @MinLength(8)
    @Field()
    username: string

    @IsString()
    @MinLength(8)
    @Field()
    password: string
}