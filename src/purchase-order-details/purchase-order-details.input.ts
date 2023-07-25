import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString, IsUUID } from "class-validator";

@InputType()
export class purchasesOrderDetailInput {
    @Field()
    @IsUUID()
    @IsString()
    goodsId: string

    @Field()
    @IsNumber()
    quantity: number
}