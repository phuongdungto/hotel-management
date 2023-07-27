import { Field, InputType } from "@nestjs/graphql";
import { IsDate } from "class-validator";

@InputType()
export class timeRangeInput {
    @Field()
    @IsDate()
    startDate: Date

    @Field()
    @IsDate()
    endDate: Date
}