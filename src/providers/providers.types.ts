import { Field, ObjectType } from "@nestjs/graphql"
import { Providers } from "./providers.entity"

@ObjectType()
export class getProvidersType {
    @Field(() => [Providers])
    providers: Providers[]

    @Field()
    totalPage: number
}