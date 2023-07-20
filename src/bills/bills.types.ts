import { Field, ObjectType } from "@nestjs/graphql"
import { RoomReservation } from "../room-reservation/room-reservation.entity"
import { Bill } from "./bills.entity"
import { billDetailType } from "../bill-details/bill-detail.types"
import { BillDetail } from "src/bill-details/bill-detail.entity"

@ObjectType()
export class billType extends Bill {
    @Field(() => RoomReservation)
    roomReservation: RoomReservation

    @Field(() => [billDetailType])
    billDetails: billDetailType[];

    @Field()
    totalRental: number

    @Field()
    totalService: number

    @Field()
    totalRoomPromotion: number

    @Field()
    totalServicePromotion: number
}

@ObjectType()
export class getBillsType {
    @Field(() => [billType])
    bills: billType[]

    @Field()
    totalPage: number
}