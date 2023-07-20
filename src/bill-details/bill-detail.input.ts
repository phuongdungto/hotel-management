import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString, IsUUID } from "class-validator";

@InputType()
export class billDetailsType {
    @Field()
    @IsUUID()
    @IsString()
    serviceId: string

    @Field()
    @IsNumber()
    quantity: number
}