import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class baseType {
    @Field()
    id: string

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}