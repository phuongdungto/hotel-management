import { Field, ObjectType } from "@nestjs/graphql";
import { Bill } from "src/bills/bills.entity";

@ObjectType()
export class statisticsByDayType {
    @Field(() => [statisticsDayType])
    bills: statisticsDayType[]

    @Field()
    dailyRevenue: number
}

@ObjectType()
export class statisticsDayType extends Bill {
    @Field()
    total: number
}

@ObjectType()
export class statisticsByMonth {
    @Field()
    date: string

    @Field()
    revenue: number
}

@ObjectType()
export class statisticsByMonthType {
    @Field(() => [statisticsByMonth])
    dailyRevenues: statisticsByMonth[]

    @Field()
    monthlyRevenue: number
}

@ObjectType()
export class statisticsByYear {
    @Field()
    month: string

    @Field()
    monthlyRevenue: number
}

@ObjectType()
export class statisticsByYearType {
    @Field(() => [statisticsByYear])
    monthlyRevenues: statisticsByYear[]

    @Field()
    yearlyRevenue: number
}

@ObjectType()
export class statisticsByTimeRangeType {
    @Field(() => [statisticsDayType])
    bills: statisticsDayType[]

    @Field()
    revenue: number
}