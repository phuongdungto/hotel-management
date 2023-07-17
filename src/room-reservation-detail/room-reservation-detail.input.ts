import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsUUID } from "class-validator";

@InputType()
export class roomReservationDetailsType {
    @Field()
    @IsUUID()
    @IsString()
    roomId: string
}