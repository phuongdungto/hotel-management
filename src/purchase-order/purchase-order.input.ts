import { Field, InputType } from "@nestjs/graphql"
import { purchasesOrderDetailInput } from "../purchase-order-details/purchase-order-details.input"
import { IsArray, IsEnum, IsOptional, IsString, IsUUID } from "class-validator"
import { FilterPagination } from "../core/interfaces/fiter.interface"

@InputType()
export class createPurchaseOrderInput {
    @Field()
    @IsUUID()
    @IsString()
    providerId: string

    @Field(() => [purchasesOrderDetailInput])
    @IsArray()
    purchaseOrderDetails: purchasesOrderDetailInput[]
}

@InputType()
export class updatePurchaseOrderInput {
    @Field()
    @IsUUID()
    @IsString()
    id: string

    @Field()
    @IsUUID()
    @IsString()
    providerId: string

    @Field(() => [purchasesOrderDetailInput], { nullable: true })
    @IsArray()
    @IsOptional()
    purchaseOrderDetails: purchasesOrderDetailInput[]
}

@InputType()
export class getPurchaseOrdersInput implements FilterPagination {
    @Field({ nullable: true })
    @IsOptional()
    staffId: string

    @Field({ nullable: true })
    @IsOptional()
    providerId: string

    @IsOptional()
    @Field({ nullable: true })
    page: number

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