import { Field, InputType } from "@nestjs/graphql";
import { FilterPagination } from "../core/interfaces/fiter.interface";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { BillStatus } from "../core/enum";
import { billDetailsType } from "src/bill-details/bill-detail.input";

@InputType()
export class getBillsInput implements FilterPagination {
    @Field({ nullable: true })
    @IsUUID()
    @IsOptional()
    staffId: string

    @Field({ nullable: true })
    @IsUUID()
    @IsOptional()
    customerId: string

    @Field({ nullable: true })
    @IsUUID()
    @IsOptional()
    roomReservationId: string

    @Field(() => [String], { nullable: true })
    @IsEnum(BillStatus, { each: true })
    @IsArray()
    @IsOptional()
    status: string[]

    @IsOptional()
    @IsNumber()
    @Field({ nullable: true })
    page: number

    @IsOptional()
    @IsNumber()
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

@InputType()
export class updateBillInput {
    @IsUUID()
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    id: string

    @Field({ nullable: true })
    @IsUUID()
    @IsOptional()
    staffId: string

    @Field({ nullable: true })
    @IsUUID()
    @IsOptional()
    customerId: string

    @Field({ nullable: true })
    @IsUUID()
    @IsOptional()
    roomReservationId: string

    @Field({ nullable: true })
    @IsOptional()
    @IsEnum(BillStatus)
    status: string

    @Field(() => [billDetailsType], { nullable: true })
    @IsArray()
    @IsOptional()
    billDetails: billDetailsType[]
}

@InputType()
export class checkOutInput {
    @IsUUID()
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    id: string

    @Field({ nullable: true })
    @IsOptional()
    @IsEnum(BillStatus)
    status: string
}