import { Field, ObjectType } from "@nestjs/graphql";
import { RoomReservation } from "./room-reservation.entity";

@ObjectType()
export class getRoomReservationsTypes{
    @Field(()=>[RoomReservation])
    roomReservations: RoomReservation[]

    @Field()
    totalPage:number
}