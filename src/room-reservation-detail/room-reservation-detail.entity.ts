import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    Relation,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { Rooms } from '../rooms/rooms.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('room_reservation_detail')
export class RoomReservationDetail {
    constructor(data?: Partial<RoomReservationDetail>) {
        Object.assign(this, data);
    }

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => RoomReservation, roomReservation => roomReservation.roomReservationDetails)
    @JoinColumn()
    roomReservation: Relation<RoomReservation>;

    @Field()
    @Column()
    roomReservationId: string

    @ManyToOne(() => Rooms, room => room.roomReservationsDetails)
    @JoinColumn()
    room: Relation<Rooms>;

    @Field()
    @Column()
    roomId: string

}