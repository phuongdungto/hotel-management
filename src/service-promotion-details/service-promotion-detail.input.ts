import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString, IsUUID } from "class-validator";


@InputType()
export class servicePromotionDetailType {
    @Field()
    @IsString()
    @IsUUID()
    serviceId: string

    @Field()
    @IsNumber()
    percent: number
}
