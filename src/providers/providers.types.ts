import { Field, ObjectType } from "@nestjs/graphql"
import { Providers } from "./providers.entity"

@ObjectType()
export class providerType {
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    address: string

    @Field()
    numberPhone: string
}

@ObjectType()
export class getProvidersType {
    @Field(() => [Providers])
    providers: Providers[]

    @Field()
    totalPage: number
}