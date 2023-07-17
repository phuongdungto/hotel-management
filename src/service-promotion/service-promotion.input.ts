import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsDate, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { FilterPagination } from "src/core/interfaces/fiter.interface";
import { servicePromotionDetailType } from "src/service-promotion-details/service-promotion-detail.input";


@InputType()
export class createServicePromotionInput {
    @Field()
    @IsDate()
    dateStart: Date;

    @Field()
    @IsDate()
    dateEnd: Date;

    @Field()
    @IsString()
    name: string;

    @Field(() => [servicePromotionDetailType], { nullable: true })
    @IsArray()
    @IsOptional()
    servicePromotionDetails: servicePromotionDetailType[]
}

@InputType()
export class updateServicePromotionInput {
    @IsUUID()
    @IsString()
    @Field()
    id: string

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    dateStart: Date;

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    dateEnd: Date;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    name: string;

    @Field(() => [servicePromotionDetailType], { nullable: true })
    @IsArray()
    @IsOptional()
    servicePromotionDetails: servicePromotionDetailType[]
}

@InputType()
export class getServicePromotionsInput implements FilterPagination {
    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    dateStart: Date;

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    dateEnd: Date;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    name: string

    @IsOptional()
    @IsOptional()
    @Field({ nullable: true })
    page: number

    @IsOptional()
    @IsOptional()
    @Field({ nullable: true })
    limit: number

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    sort: string

    @IsEnum(['desc', 'asc'])
    @IsOptional()
    @Field({ nullable: true })
    sortBy: string

    constructor() {
        this.page = 1;
        this.limit = 5
    }
}