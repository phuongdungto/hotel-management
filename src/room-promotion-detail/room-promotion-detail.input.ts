import { Field, InputType } from "@nestjs/graphql"
import { IsString, IsUUID } from "class-validator"

@InputType()
export class roomPromotionDetailType {
    @Field()
    @IsString()
    @IsUUID()
    roomId: string
}